
const TMDB_API_KEY = '73b84d6248e09ee88319328e6de6cf0f';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export interface TMDBMovie {
  id: number;
  title: string;
  name?: string; // For TV shows
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  first_air_date?: string; // For TV shows
  vote_average: number;
  genre_ids: number[];
  media_type?: string;
}

export interface TMDBResponse {
  results: TMDBMovie[];
  total_pages: number;
  total_results: number;
}

const fetchFromTMDB = async (endpoint: string): Promise<TMDBResponse> => {
  console.log(`Fetching from TMDB: ${TMDB_BASE_URL}${endpoint}`);
  
  try {
    const response = await fetch(`${TMDB_BASE_URL}${endpoint}?api_key=${TMDB_API_KEY}`);
    console.log(`TMDB response status: ${response.status}`);
    
    if (!response.ok) {
      throw new Error(`TMDB API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log(`TMDB data received:`, data);
    return data;
  } catch (error) {
    console.error('Error fetching from TMDB:', error);
    // Return empty results instead of throwing to prevent app crash
    return {
      results: [],
      total_pages: 0,
      total_results: 0
    };
  }
};

export const tmdbService = {
  getTrending: () => fetchFromTMDB('/trending/all/week'),
  getPopularMovies: () => fetchFromTMDB('/movie/popular'),
  getPopularTVShows: () => fetchFromTMDB('/tv/popular'),
  getActionMovies: () => fetchFromTMDB('/discover/movie?with_genres=28'),
  
  getImageUrl: (path: string) => {
    if (!path) return '';
    return `${TMDB_IMAGE_BASE_URL}${path}`;
  },
  
  formatDuration: (movie: TMDBMovie) => {
    if (movie.media_type === 'tv' || movie.name) {
      return 'TV Series';
    }
    return 'Movie';
  },
  
  getTitle: (movie: TMDBMovie) => movie.title || movie.name || 'Unknown Title',
  
  getReleaseYear: (movie: TMDBMovie) => {
    const date = movie.release_date || movie.first_air_date;
    return date ? new Date(date).getFullYear() : '';
  }
};
