import * as React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {
  Platform, StatusBar, StyleSheet, View, Modal
} from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
import { reducers, actions } from './store';
import ArticleScreen from './screens/ArticleScreen';
import LoadingScreen from './screens/LoadingScreen';
import AuthorScreen from './screens/AuthorScreen';
import ResultsScreen from './screens/ResultsScreen';
import Auth from './components/Auth';

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
  const [mounted, setMounted] = React.useState(false);
  const [showAuthModal, setShowAuthModal] = React.useState(false);
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app

  React.useEffect(() => {
    console.log('re-rendering')
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

      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setFontLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    if (!isFontLoadingComplete) loadResourcesAndDataAsync();

    if (!mounted) {
      store.subscribe(() => {
        console.log(`updating auth modal status to ${store.getState().user.showAuthModal}, currently it is ${showAuthModal}`)
        if (store.getState().user.showAuthModal !== showAuthModal) setShowAuthModal(store.getState().user.showAuthModal)
      })
      setMounted(true)
    }
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
                  <Stack.Screen name="Results" component={ResultsScreen} />
                  <Stack.Screen name="Article" component={ArticleScreen} />
                  <Stack.Screen name="Author" component={AuthorScreen} />
                </Stack.Navigator>
              </NavigationContainer>
            )}
            <Modal
              visible={showAuthModal}
              animationType='slide'
              presentationStyle='formSheet'
            >
              <View style={styles.modal}>
                <Auth></Auth>
              </View>
            </Modal>
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
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
