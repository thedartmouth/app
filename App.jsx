import * as React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {
  Platform, StatusBar, StyleSheet, View,
} from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
import { reducers, actions } from './store';
import ArticleScreen from './screens/ArticleScreen';
import LoadingScreen from './screens/LoadingScreen';
import AuthorScreen from './screens/AuthorScreen';

const Stack = createStackNavigator();

export const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f,
));

export default function App(props) {
  const [isFontLoadingComplete, setFontLoadingComplete] = React.useState(false);
  const [isFeedLoadingComplete, setFeedLoadingComplete] = React.useState(false);
  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          Ionicons: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
          'poppins-bold': require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),
          'poppins-regular': require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
          'poppins-light': require('./assets/fonts/Poppins/Poppins-Light.ttf'),
          'libre-bold': require('./assets/fonts/Libre_Baskerville/LibreBaskerville-Bold.ttf'),
          'libre-regular': require('./assets/fonts/Libre_Baskerville/LibreBaskerville-Regular.ttf'),
          'libre-italic': require('./assets/fonts/Libre_Baskerville/LibreBaskerville-Italic.ttf'),
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });

        const token = await SecureStore.getItemAsync('token');
        if (token) store.dispatch(actions.getUser(token));
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setFontLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isFontLoadingComplete) return null;
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar style={styles.statusBar} barStyle="dark-content" />}
          {(!isFeedLoadingComplete && !props.skipLoadingScreen)
            ? <LoadingScreen completeLoading={() => setFeedLoadingComplete(true)} />
            : (
              <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Root" component={BottomTabNavigator} />
                  <Stack.Screen name="Article" component={ArticleScreen} />
                  <Stack.Screen name="Author" component={AuthorScreen} />
                </Stack.Navigator>
              </NavigationContainer>
            )}
        </View>
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  statusBar: {
    backgroundColor: 'white',
  },
});
