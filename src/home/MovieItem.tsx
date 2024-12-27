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
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';

import {IMovie} from './IMovie';
import moment from 'moment';
const screenWidth = Dimensions.get('window').width;
const PADDING_HORIZONAL = 8;
const CARD_WIDTH = screenWidth - PADDING_HORIZONAL * 2;
const CARD_HEIGHT = (CARD_WIDTH * 9) / 16;
const MovieItem = ({movie}: {movie: IMovie}) => {
  var releaseDate = moment(movie.release_date, 'YYYY-MM-DD');
  return (
    <View
      style={{
        height: CARD_HEIGHT,
        marginBottom: 10,
        borderRadius: 8,
        paddingHorizontal: PADDING_HORIZONAL,
      }}>
      <Image
        style={{
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          borderRadius: 8,
        }}
        source={{
          uri: movie.uri,
        }}
      />
      <View
        style={{
          position: 'absolute',
          left: PADDING_HORIZONAL,
          bottom: 0,
          padding: 8,
        }}>
        <Text style={{fontSize: 22, fontWeight: 'bold'}}>{movie.title}</Text>
        <Text style={{fontSize: 12}}>{releaseDate.format('DD MMM YYYY')}</Text>
      </View>
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

export default MovieItem;
