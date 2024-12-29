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
import {StyleSheet} from 'react-native';

import Home from './src/home/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MovieDetail from './src/home/MovieDetail';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {initSdk} from 'mymoviesdk';
import {API_KEY} from './src/api/key';
import {setJSExceptionHandler} from 'react-native-exception-handler';
import {handleError} from './src/hook/useHandleError';
//setJSExceptionHandler to handle JS exceptions
setJSExceptionHandler((error, isFatal) => {
  handleError(error);
}, true);
initSdk({apiKey: API_KEY});
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeAreaContainer}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              options={{headerShown: true}}
              name="MovieDetail"
              component={MovieDetail}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'white',
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

export default App;
