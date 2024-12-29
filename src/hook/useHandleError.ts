import {useEffect} from 'react';
import {Alert} from 'react-native';

export function useHandleError(error) {
  useEffect(() => {
    if (error) {
      //only show error message in development mode
      Alert.alert(
        'Error',
        __DEV__ ? error : 'An error occurred; please try again later',
      );
    }
  }, [error]);
  return;
}
