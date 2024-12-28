/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { memo } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {IMovie} from '../sdk/type';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const PADDING_HORIZONAL = 8;
const CARD_WIDTH = screenWidth - PADDING_HORIZONAL * 2;
const CARD_HEIGHT = (CARD_WIDTH * 9) / 16;

const MovieItem = ({movie}: {movie: IMovie}) => {
  const navigation = useNavigation<any>();
  var releaseDate = moment(movie.release_date, 'YYYY-MM-DD');
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('MovieDetail', {id: movie.id});
      }}
      style={{
        height: CARD_HEIGHT,
        marginBottom: 10,
        borderRadius: 8,
      }}>
      <Image
        style={{
          width: CARD_WIDTH,
          height: CARD_HEIGHT,
          borderRadius: 8,
        }}
        source={
          movie.uri
            ? {
                uri: movie.uri,
              }
            : require('./video-player-placeholder.jpg')
        }
      />

      <View
        style={{
          position: 'absolute',
          left: PADDING_HORIZONAL,
          bottom: 8,
          padding: 8,
        }}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.releaseDate}>
          {releaseDate.format('DD MMM YYYY')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {fontSize: 22, fontWeight: 'bold', color: 'white'},
  releaseDate: {fontSize: 12, color: 'white'},
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

export default memo(MovieItem);
