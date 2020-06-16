import * as React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import useLinking from './navigation/useLinking';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ArticleScreen from './screens/ArticleScreen';
import LoadingScreen from './screens/LoadingScreen';

const Stack = createStackNavigator();

export const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
));

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);
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
          ...Ionicons.font,
          'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        // console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    // loadResourcesAndDataAsync();
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar style={styles.statusBar} barStyle="dark-content" />}
        {(!isLoadingComplete && !props.skipLoadingScreen) ?
          <LoadingScreen completeLoading={() => setLoadingComplete(true)} />
        :
          <NavigationContainer ref={containerRef} initialState={initialNavigationState} >
            <Stack.Navigator screenOptions={{headerShown: false}} >
              <Stack.Screen name="Root" component={BottomTabNavigator} />
              <Stack.Screen name="Article" component={ArticleScreen} />            
            </Stack.Navigator>
          </NavigationContainer>
        }
        </View>
      </SafeAreaProvider>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  statusBar: {
    backgroundColor: 'white',
  }
});
