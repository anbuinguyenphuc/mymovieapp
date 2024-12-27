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

const Home = () => {
  const [filmList, setFilmList] = useState<IMovie[]>([]);
  useEffect(() => {
    const url =
      'https://api.themoviedb.org/3/trending/movie/day?language=en-US';
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
        console.log(JSON.stringify(json));
        setFilmList(
          json.results.map((i: any) => {
            return {
              ...i,
              uri: 'https://image.tmdb.org/t/p/original' + i.backdrop_path,
            };
          }),
        );
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <View style={{flex: 1}}>
      <FlatList
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
