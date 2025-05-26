
import { Play, Plus, ChevronDown } from "lucide-react";
import { useState } from "react";
import { TMDBMovie, tmdbService } from "@/services/tmdbService";

interface ContentCardProps {
  content: TMDBMovie;
}

const ContentCard = ({ content }: ContentCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const imageUrl = tmdbService.getImageUrl(content.poster_path);
  const title = tmdbService.getTitle(content);
  const type = tmdbService.formatDuration(content);
  const year = tmdbService.getReleaseYear(content);

  const handleRatingClick = () => {
    const imdbUrl = `https://www.imdb.com/title/${content.id}`;
    window.open(imdbUrl, '_blank');
  };

  const handlePlayClick = () => {
    const streamingUrls = [
      `https://vidsrc.cc/v2/embed/${content.media_type === 'tv' ? 'tv' : 'movie'}/${content.id}`,
      `https://vidsrc.me/embed/${content.media_type === 'tv' ? 'tv' : 'movie'}/${content.id}`,
      `https://vidlink.pro/movie/${content.id}`
    ];
    
    // Try the first streaming service
    window.open(streamingUrls[0], '_blank');
  };

  return (
    <div 
      className="flex-shrink-0 w-72 cursor-pointer transform transition-all duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-lg bg-gray-800 shadow-2xl">
        {/* Image */}
        <div className="aspect-video overflow-hidden">
          <img 
            src={imageUrl || 'https://images.unsplash.com/photo-1489599510096-ac2be9b0f954?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
        
        {/* Overlay on hover */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 animate-fade-in">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{title}</h3>
              
              <div className="flex items-center gap-2 mb-3">
                <button 
                  onClick={handlePlayClick}
                  className="bg-white text-black rounded-full p-2 hover:bg-gray-200 transition-colors"
                >
                  <Play className="h-4 w-4 fill-current" />
                </button>
                <button className="border-2 border-white text-white rounded-full p-2 hover:bg-white hover:text-black transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
                <button className="border-2 border-white text-white rounded-full p-2 hover:bg-white hover:text-black transition-colors">
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <button
                  onClick={handleRatingClick}
                  className="bg-green-600 px-2 py-1 rounded text-white text-xs font-semibold hover:bg-green-700 transition-colors cursor-pointer"
                >
                  {Math.round(content.vote_average * 10)/10}
                </button>
                {year && <span>{year}</span>}
                {year && <span>•</span>}
                <span className="capitalize">{type}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentCard;
