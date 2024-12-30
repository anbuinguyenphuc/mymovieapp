/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback, useEffect, useRef} from 'react';
import {
  FlatList,
  Keyboard,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';

import MovieItem from './MovieItem';
import {Searchbar} from 'react-native-paper';
import {useSearchMovieV2} from 'mymoviesdk';
import {useHandleError} from '../hook/useHandleError';

const Home = () => {
  const flatListRef = useRef<any>(null);
  const {
    movieList,
    setSearchQuery,
    searchQuery,
    loading,
    error,
    refreshMovies,
  } = useSearchMovieV2({
    initSearchQuery: '',
    performanceMode: 'debounce',
  });
  useHandleError(error);
  useEffect(() => {
    if (flatListRef) flatListRef?.current?.scrollToOffset({y: 0});
  }, [searchQuery]);

  useEffect(() => {
    if (!loading) {
      Keyboard.dismiss();
    }
  }, [loading]);

  const renderItem = useCallback(({item}) => <MovieItem movie={item} />, []);
  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
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
            onRefresh={refreshMovies}
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
