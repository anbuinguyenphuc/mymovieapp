/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  IMAGE_500_URL,
  useGetMovieDetail,
  useGetMovieDetailV2,
  useGetMovieKeywords,
  useGetMovieKeywordsV2,
  useGetMovieReviews,
  useGetMovieReviewsV2,
} from 'mymoviesdk';
import {Text} from 'react-native-paper';
import {useHandleError} from '../hook/useHandleError';

let reviewSectionPosition = 0;
const MAX_ACTOR_ITEM = 5;
const MovieDetail = (props: any) => {
  const refScrollView = useRef<any>(null);
  const {id} = props?.route?.params;
  const [currentPage, setCurrentPage] = useState(1); // Current page for reviews
  // #region Hook section
  const {
    movieDetail,
    loading,
    error: errorMovieDetail,
  } = useGetMovieDetailV2({id});
  const {
    reviews,
    totalPage,
    error: errorMovieReview,
  } = useGetMovieReviewsV2({id, page: currentPage});
  const {keywords, error: errorMovieKeyword} = useGetMovieKeywordsV2({id});
  useHandleError(errorMovieDetail || errorMovieKeyword || errorMovieReview);
  // #endregion

  // #region handle pagination section
  const castList = movieDetail?.credits?.cast;
  const handleNextPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage(prev => prev + 1);
      if (refScrollView)
        refScrollView?.current?.scrollTo({y: reviewSectionPosition});
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      if (refScrollView)
        refScrollView?.current?.scrollTo({y: reviewSectionPosition});
    }
  };
  // #endregion

  // #region handle show all actor section
  const [showAllActors, setShowAllActors] = useState(false);
  const toggleActors = () => {
    setShowAllActors(prev => !prev);
  };

  const visibleActors = showAllActors ? castList : castList?.slice(0, 5);
  // #endregion
  //because this component is not big enough so no need to split below sections to separate componnents
  const renderPosterSection = () => {
    return (
      <View style={styles.header}>
        <Image
          source={{
            uri: `${IMAGE_500_URL}${movieDetail?.poster_path}`,
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
    );
  };

  const renderGenresSection = () => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Genres</Text>
        <Text style={styles.text}>
          {movieDetail?.genres.map(genre => genre.name).join(', ')}
        </Text>
      </View>
    );
  };

  const renderOverviewSection = () => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.text}>{movieDetail?.overview}</Text>
      </View>
    );
  };
  const renderCompanySection = () => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Production Companies</Text>
        <Text style={styles.text}>
          {movieDetail?.production_companies
            .map(company => company.name)
            .join(', ')}
        </Text>
      </View>
    );
  };

  const renderKeywordsSection = () => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Keywords</Text>
        <View style={styles.keywordsContainer}>
          {keywords.length > 0 ? (
            keywords.map((keyword, index) => (
              <View key={index} style={styles.keyword}>
                <Text style={styles.keywordText}>{keyword?.name}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noKeywords}>No keywords available.</Text>
          )}
        </View>
      </View>
    );
  };

  const renderCastSection = () => {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cast</Text>
        {visibleActors?.map(actor => (
          <View key={actor.id} style={styles.castItem}>
            <Image
              source={{
                uri: actor.profile_path
                  ? `${IMAGE_500_URL}${actor.profile_path}`
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
            <Text style={styles.loadMoreText}>
              {showAllActors ? 'Load less' : 'Load more'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderReviewSection = () => {
    return (
      <View
        style={styles.section}
        onLayout={event => {
          const layout = event.nativeEvent.layout;
          reviewSectionPosition = layout.y;
        }}>
        <Text style={styles.sectionTitle}>Reviews</Text>
        {reviews?.length === 0 ? (
          <Text>{'No reviews'}</Text>
        ) : (
          <>
            {reviews?.map(review => (
              <View key={review.id} style={styles.reviewItem}>
                <Text style={styles.reviewAuthor}>{review.author}</Text>
                <Text style={styles.reviewContent}>{review.content}</Text>
                {review?.author_details?.rating && (
                  <Text style={styles.reviewRating}>
                    Rating: {review?.author_details?.rating} ⭐
                  </Text>
                )}
              </View>
            ))}
            <View style={styles.pagination}>
              <TouchableOpacity
                onPress={handlePreviousPage}
                disabled={currentPage === 1}
                style={[
                  styles.pageButton,
                  currentPage === 1 && styles.disabledButton,
                ]}>
                <Text style={styles.pageButtonText}>Previous</Text>
              </TouchableOpacity>
              <Text style={styles.pageIndicator}>
                Page {currentPage} of {totalPage}
              </Text>
              <TouchableOpacity
                onPress={handleNextPage}
                disabled={currentPage === totalPage}
                style={[
                  styles.pageButton,
                  currentPage === totalPage && styles.disabledButton,
                ]}>
                <Text style={styles.pageButtonText}>Next</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  };

  return loading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <ScrollView ref={refScrollView} style={styles.container}>
      {/* Backdrop */}
      <Image
        source={{
          uri: movieDetail?.backdrop_url,
        }}
        style={styles.backdrop}
      />

      {renderPosterSection()}
      {renderGenresSection()}
      {renderOverviewSection()}
      {renderCompanySection()}
      {renderKeywordsSection()}
      {renderCastSection()}
      {renderReviewSection()}
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
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  pageButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#007BFF',
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  pageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pageIndicator: {
    fontSize: 16,
    color: '#333',
  },
  keywordsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  keyword: {
    backgroundColor: '#007bff',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  keywordText: {
    color: '#fff',
    fontSize: 12,
  },
  noKeywords: {
    fontSize: 14,
    color: '#777',
  },
});

export default MovieDetail;
