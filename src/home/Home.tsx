/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';

import MovieItem from './MovieItem';
import {Searchbar} from 'react-native-paper';
import {useSearchMovie} from 'mymoviesdk';

const Home = () => {
  const {movieList, setSearchQuery, searchQuery, loading} = useSearchMovie({
    initSearchQuery: '',
    performanceMode: 'debounce',
  });
  const renderItem = useCallback(({item}) => <MovieItem movie={item} />, []);
  return (
    <View style={styles.container}>
      <FlatList
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <View style={styles.searchBarContainer}>
            <Searchbar
              placeholder="Search"
              onChangeText={setSearchQuery}
              style={styles.searchBar}
              value={searchQuery}
            />
          </View>
        }
        refreshControl={
          <RefreshControl
            colors={['#9Bd35A', '#689F38']}
            refreshing={loading}
          />
        }
        data={movieList}
        renderItem={renderItem}
        keyExtractor={item => item?.id?.toString()}
        removeClippedSubviews={false}
        maxToRenderPerBatch={3}
        initialNumToRender={5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 8, backgroundColor: 'white'},
  searchBarContainer: {backgroundColor: '#fff'},
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
