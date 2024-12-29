import {useEffect} from 'react';
import {Alert} from 'react-native';

export function useHandleError(error) {
  useEffect(() => {
    handleError(error);
  }, [error]);
  return;
}

export const handleError = error => {
  //only show error message in development mode˝
  if (error)
    Alert.alert(
      'Notice',
      __DEV__ ? error.message : 'An error occurred; please try again later',
    );
};
