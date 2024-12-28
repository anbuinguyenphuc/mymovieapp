import {useEffect, useState} from 'react';
import {API_KEY} from '../api/api-action';
import {IMovie} from '../home/IMovie';
import {useDebounce} from '../helper/useDebounce';
import {
  API_DOMAIN,
  IMAGE_URI,
  SEARCH_MOVIE_URL,
  TRENDING_MOVIE_URL,
} from './ApiDomain';

export function useSearchMovie({
  initSearchQuery,
  performanceMode,
}: {
  initSearchQuery: string;
  performanceMode: 'debounce' | 'normal';
}) {
  const [query, setQuery] = useState(initSearchQuery);
  const [loading, setLoading] = useState(false);
  const [movieList, setMovieList] = useState<IMovie[]>([]);
  const debouncedSearchQuery = useDebounce(
    query,
    performanceMode == 'debounce' ? 500 : 0,
  );
  useEffect(() => {
    const url = debouncedSearchQuery
      ? `${TRENDING_MOVIE_URL}${debouncedSearchQuery}`
      : `${SEARCH_MOVIE_URL}`;

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        setLoading(false);
        setMovieList(
          json.results.map((i: any) => {
            return {
              ...i,
              uri: i.backdrop_path ? IMAGE_URI + i.backdrop_path : null,
            };
          }),
        );
      })
      .catch(err => console.error(err));
  }, [debouncedSearchQuery]);

  const setSearchQuery = (newQuery: string) => {
    setLoading(true);
    setQuery(newQuery);
  };

  return {
    movieList,
    setSearchQuery: setSearchQuery,
    searchQuery: query,
    loading,
  };
}
