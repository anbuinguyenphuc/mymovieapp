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
import { Provider } from "react-redux";
import store from 'mymoviesdk/src/sdk/redux/store';
/**
 * //TODO
 * WHAT COULD BE DONE BETTER IN THIS PROJECT IF IT IS A REAL PRODUCT
 * 1. Caching movies list to reduce loading time and reduce traffic for Backend Services by using mem-cache technic and react-native-mmkv storage.
 * 2. Adding Redux (thunk) to support state management at scale better, for now I'm think it's good enough to use React Hook.
 * 3. Adding proguard to protect reverse engineering.
 * 4. Adding feature searching movie by keywords because currently, the offical api that suppot searching by keywords is deprecated and don't look optimized for searching flow.
 * 5. Optimizing movie list performance by calculating internet quality to swith bettween hight and low quality images.
 * 6. Optimizing movie detail screen by lazy loading Review section (only start requesting reviews when user scroll near to bottom).
 * 7. Covering app with test cases by using Jest or Detox.
 * 8. Have better UI design.
 * 9. Consider switching to flashlist to improve list performance at scale.
 * 10. Supporting documentation for SDK integration and function details.
 */

//setJSExceptionHandler to handle JS exceptions
setJSExceptionHandler((error, isFatal) => {
  handleError(error);
}, true);

//init Movie SDK
initSdk({apiKey: API_KEY});

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
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
    </Provider>
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
