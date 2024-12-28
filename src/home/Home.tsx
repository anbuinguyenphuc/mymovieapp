/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {API_KEY} from '../api/api-action';
import MovieItem from './MovieItem';
import {IMovie} from './IMovie';
import {Searchbar} from 'react-native-paper';
import {useDebounce} from '../helper/useDebounce';

const Home = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };
  const [filmList, setFilmList] = useState<IMovie[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  useEffect(() => {
    const url = debouncedSearchQuery
      ? `https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=${debouncedSearchQuery}`
      : 'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
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
        //console.log(JSON.stringify(json));
        setFilmList(
          json.results.map((i: any) => {
            return {
              ...i,
              uri: i.backdrop_path
                ? 'https://image.tmdb.org/t/p/original' + i.backdrop_path
                : null,
            };
          }),
        );
      })
      .catch(err => console.error(err));
  }, [debouncedSearchQuery]);

  return (
    <View style={{flex: 1, padding: 8}}>
      <FlatList
        ListHeaderComponent={
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            style={{
              marginBottom: 8,
              backgroundColor: '#d6d6d6',
            }}
            value={searchQuery}
          />
        }
        data={filmList}
        renderItem={({item}) => <MovieItem movie={item} />}
        keyExtractor={item => item?.id?.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default Home;
