/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {useGetMovieDetail} from '../sdk/MovieManager';
import {Text} from 'react-native-paper';
import {IMAGE_ORIGINAL_URL} from '../sdk/ApiDomain';

const screenWidth = Dimensions.get('window').width;
const CARD_WIDTH = screenWidth;
const CARD_HEIGHT = (CARD_WIDTH * 9) / 16;
const MAX_ACTOR_ITEM = 5;
const MovieDetail = (props: any) => {
  const {id} = props?.route?.params;
  const {movieDetail, loading} = useGetMovieDetail({id});
  const castList = movieDetail?.credits?.cast;
  const [showAllActors, setShowAllActors] = useState(false);
  const toggleActors = () => {
    setShowAllActors(prev => !prev);
  };

  const visibleActors = showAllActors ? castList : castList?.slice(0, 5);

  return loading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <ScrollView style={styles.container}>
      {/* Backdrop */}
      <Image
        source={{
          uri: movieDetail?.backdrop_url,
        }}
        style={styles.backdrop}
      />

      {/* Poster and Title Section */}
      <View style={styles.header}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movieDetail?.poster_path}`,
          }}
          style={styles.poster}
        />
        <View style={styles.details}>
          <Text style={styles.title}>{movieDetail?.title}</Text>
          <Text style={styles.tagline}>"{movieDetail?.tagline}"</Text>
          <Text style={styles.info}>
            {movieDetail?.release_date} | {movieDetail?.runtime} min |{' '}
            {movieDetail?.vote_average} ⭐
          </Text>
        </View>
      </View>

      {/* Genres */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Genres</Text>
        <Text style={styles.text}>
          {movieDetail?.genres.map(genre => genre.name).join(', ')}
        </Text>
      </View>

      {/* Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.text}>{movieDetail?.overview}</Text>
      </View>

      {/* Production Companies */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Production Companies</Text>
        <Text style={styles.text}>
          {movieDetail?.production_companies
            .map(company => company.name)
            .join(', ')}
        </Text>
      </View>

      {/* Cast */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cast</Text>
        {visibleActors?.map(actor => (
          <View key={actor.id} style={styles.castItem}>
            <Image
              source={{
                uri: actor.profile_path
                  ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                  : 'https://via.placeholder.com/50',
              }}
              style={styles.castImage}
            />
            <View style={styles.castDetails}>
              <Text style={styles.castName}>{actor.name}</Text>
              <Text style={styles.castCharacter}>as {actor.character}</Text>
            </View>
          </View>
        ))}
        {castList && castList.length > MAX_ACTOR_ITEM && (
          <TouchableOpacity onPress={toggleActors}>
            <Text style={styles.loadMoreText}>{'Load more'}</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Reviews */}
      {/* <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reviews</Text>
        {movieDetail?.reviews?.map(review => (
          <View key={review.id} style={styles.reviewItem}>
            <Text style={styles.reviewAuthor}>{review.author}</Text>
            <Text style={styles.reviewContent}>{review.content}</Text>
            {review.rating && (
              <Text style={styles.reviewRating}>
                Rating: {review.rating} ⭐
              </Text>
            )}
          </View>
        ))}
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },

  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backdrop: {
    width: '100%',
    height: 200,
  },
  header: {
    flexDirection: 'row',
    padding: 16,
  },
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: 16,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tagline: {
    fontStyle: 'italic',
    color: 'gray',
    marginVertical: 4,
  },
  info: {
    color: 'gray',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  castItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  castImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  castDetails: {
    flex: 1,
  },
  castName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  castCharacter: {
    fontSize: 14,
    color: 'gray',
  },
  reviewItem: {
    marginBottom: 16,
  },
  reviewAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  reviewContent: {
    fontSize: 14,
    color: '#333',
  },
  reviewRating: {
    fontSize: 14,
    color: 'gold',
    marginTop: 4,
  },
  loadMoreText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MovieDetail;
