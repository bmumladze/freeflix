
import { Play, Plus, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { tmdbService, TMDBMovie } from "@/services/tmdbService";

const Hero = () => {
  const [featuredContent, setFeaturedContent] = useState<TMDBMovie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedContent = async () => {
      try {
        const response = await tmdbService.getTrending();
        if (response.results.length > 0) {
          setFeaturedContent(response.results[0]);
        }
      } catch (error) {
        console.error('Error fetching featured content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedContent();
  }, []);

  const backgroundImage = featuredContent?.backdrop_path 
    ? tmdbService.getImageUrl(featuredContent.backdrop_path)
    : 'https://images.unsplash.com/photo-1489599510096-ac2be9b0f954?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80';

  const title = featuredContent ? tmdbService.getTitle(featuredContent) : 'The Midnight Chronicles';
  const overview = featuredContent?.overview || 'In a world where darkness reigns supreme, a group of unlikely heroes must band together to restore light to their realm. An epic adventure filled with mystery, magic, and redemption.';
  const year = featuredContent ? tmdbService.getReleaseYear(featuredContent) : '2024';
  const rating = featuredContent ? Math.round(featuredContent.vote_average * 10) / 10 : '8.5';

  const handleRatingClick = () => {
    if (featuredContent?.id) {
      const imdbUrl = `https://www.imdb.com/title/${featuredContent.id}`;
      window.open(imdbUrl, '_blank');
    }
  };

  if (loading) {
    return (
      <div className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="animate-pulse text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.8) 100%), 
                           linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.8) 100%),
                           url('${backgroundImage}')`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed line-clamp-3">
            {overview}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button 
              size="lg" 
              className="bg-white text-black hover:bg-gray-200 transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
            >
              <Play className="h-5 w-5 fill-current" />
              Play Now
            </Button>
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-gray-500/50 hover:bg-gray-500/70 backdrop-blur-sm border-gray-400 transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
            >
              <Info className="h-5 w-5" />
              More Info
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/50 hover:bg-white/10 backdrop-blur-sm transition-all duration-200 transform hover:scale-105 flex items-center gap-2 text-white"
            >
              <Plus className="h-5 w-5 text-white" />
              <span className="text-white font-medium">My List</span>
            </Button>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <button 
              onClick={handleRatingClick}
              className="bg-green-600 px-2 py-1 rounded text-white font-semibold hover:bg-green-700 transition-colors cursor-pointer"
            >
              ★ {rating}
            </button>
            <span>{year}</span>
            <span>•</span>
            <span>HD</span>
            <span>•</span>
            <span>{featuredContent?.media_type === 'tv' || featuredContent?.name ? 'TV Series' : 'Movie'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
