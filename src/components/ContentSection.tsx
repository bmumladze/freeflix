import ContentCard from "@/components/ContentCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { tmdbService, TMDBMovie } from "@/services/tmdbService";

interface ContentSectionProps {
  title: string;
  category: string;
}

const ContentSection = ({ title, category }: ContentSectionProps) => {
  const [content, setContent] = useState<TMDBMovie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        let response;
        
        switch (category) {
          case 'trending':
            response = await tmdbService.getTrending();
            break;
          case 'movies':
            response = await tmdbService.getPopularMovies();
            break;
          case 'series':
            response = await tmdbService.getPopularTVShows();
            break;
          default:
            response = await tmdbService.getTrending();
        }
        
        let sortedContent = response.results.slice(0, 12);
        
        // Sort TV series by rating (highest first)
        if (category === 'series') {
          sortedContent = sortedContent.sort((a, b) => b.vote_average - a.vote_average);
        }
        
        setContent(sortedContent);
      } catch (err) {
        setError('Failed to load content');
        console.error('Error fetching TMDB data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [category]);

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById(`scroll-${category}`);
    if (container) {
      const scrollAmount = 320;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">{title}</h2>
        <div className="flex gap-4 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-72 h-40 bg-gray-800 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">{title}</h2>
        <div className="text-red-400 text-center py-8">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">{title}</h2>
      
      <div className="relative group">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        
        <button 
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        <div 
          id={`scroll-${category}`}
          className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {content.map((item) => (
            <ContentCard key={item.id} content={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
