export const API_DOMAIN = 'https://api.themoviedb.org';
export const TRENDING_MOVIE_URL = `${API_DOMAIN}/3/search/movie?include_adult=false&page=1&query=`;
export const SEARCH_MOVIE_URL = `${API_DOMAIN}/3/trending/movie/day?language=en-US`;

export const IMAGE_DOMAIN = 'https://image.tmdb.org';

//currently I don't have problem with using original images quality, so keep the image quality as original. 
//IMAGE_500_URL will be used later to optimize for slow internet connection
export const IMAGE_ORIGINAL_URL = `${IMAGE_DOMAIN}/t/p/original`;
export const IMAGE_500_URL = `${IMAGE_DOMAIN}/t/p/w500`;
