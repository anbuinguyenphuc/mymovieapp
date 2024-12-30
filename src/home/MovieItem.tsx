/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {memo} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {IMAGE_500_URL, IMovie} from 'mymoviesdk';
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
      style={styles.card}>
      <Image
        style={styles.image}
        source={
          movie.backdrop_path
            ? {
                uri: IMAGE_500_URL + movie.backdrop_path,
              }
            : require('./video-player-placeholder.jpg')
        }
      />

      <View style={styles.titleContainer}>
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
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 8,
  },
  titleContainer: {
    position: 'absolute',
    left: PADDING_HORIZONAL,
    bottom: 8,
    padding: 8,
  },
});

export default memo(MovieItem);
