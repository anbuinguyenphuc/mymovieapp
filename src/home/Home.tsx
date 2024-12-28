/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';

import MovieItem from './MovieItem';
import {Searchbar} from 'react-native-paper';
import {useSearchMovie} from '../sdk/MovieManager';
import {useNavigation} from '@react-navigation/native';

const Home = () => {
  const {movieList, setSearchQuery, searchQuery, loading} = useSearchMovie({
    initSearchQuery: '',
    performanceMode: 'debounce',
  });

  return (
    <View style={{flex: 1, padding: 8}}>
      <FlatList
        ListHeaderComponent={
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            style={styles.searchBar}
            value={searchQuery}
          />
        }
        refreshControl={
          <RefreshControl
            colors={['#9Bd35A', '#689F38']}
            refreshing={loading}
          />
        }
        data={movieList}
        renderItem={({item}) => <MovieItem movie={item} />}
        keyExtractor={item => item?.id?.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    marginBottom: 8,
    backgroundColor: '#d6d6d6',
  },
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
