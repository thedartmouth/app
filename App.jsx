import * as React from 'react'
import { connect } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { Platform, StatusBar, StyleSheet, View, Modal } from 'react-native'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import BottomTabNavigator from './navigation/BottomTabNavigator'
import useLinking from './navigation/useLinking'
import { reducers, actions } from './store'
import { Colors, ROOT_URL } from './constants'
import ArticleScreen from './screens/ArticleScreen'
import LoadingScreen from './screens/LoadingScreen'
import AuthorScreen from './screens/AuthorScreen'
import ResultsScreen from './screens/ResultsScreen'
import * as SecureStorage from 'expo-secure-store'
import Auth from './components/Auth'
import { Ionicons } from '@expo/vector-icons'
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
import Axios from 'axios'

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
	}),
})

async function registerForPushNotificationsAsync(setNotificationPermission, setNotificationToken) {
	let token
	if (Constants.isDevice) {
		const {
			status: existingStatus,
		} = await Notifications.getPermissionsAsync()
		let finalStatus = existingStatus
		setNotificationPermission(existingStatus)
		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync()
			finalStatus = status
		}
		if (finalStatus !== 'granted') {
			return
		}
		token = (await Notifications.getExpoPushTokenAsync()).data
	}

	if (Platform.OS === 'android') {
		Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		})
	}
	setNotificationToken(token)

	return token
}

const Stack = createStackNavigator()

export const store = createStore(
	reducers,
	{},
	compose(
		applyMiddleware(thunk),
		// eslint-disable-next-line no-underscore-dangle
		window.__REDUX_DEVTOOLS_EXTENSION__
			? window.__REDUX_DEVTOOLS_EXTENSION__()
			: (f) => f
	)
)

const ConnectedModal = connect(
	(store) => ({
		visible: store.user.showAuthModal,
	}),
	(dispatch) => ({
		show: actions.showAuthModal(dispatch),
		hide: actions.hideAuthModal(dispatch),
	})
)((props) => (
	<Modal
		visible={props.visible}
		animationType="slide"
		presentationStyle="formSheet"
		style={styles.modal}
	>
		<Ionicons
			name="ios-close"
			size={48}
			color={Colors.charcoal}
			style={styles.closeModal}
			onPress={props.hide}
		></Ionicons>
		{props.children}
	</Modal>
))

export default function App(props) {
	const [isFontLoadingComplete, setFontLoadingComplete] = React.useState(false)
	const [isFeedLoadingComplete, setFeedLoadingComplete] = React.useState(false)
	const [initialNavigationState, setInitialNavigationState] = React.useState()
	const [userLoaded, setUserLoaded] = React.useState(false)
	const [
		notificationSettingsLoaded,
		setNotificationSettingsLoaded,
	] = React.useState(false)
	const [showAuthModal, setShowAuthModal] = React.useState(false)
	const containerRef = React.useRef(null)
	const [containerMounted, setContainerMounted] = React.useState(false)
	const { getInitialState } = useLinking(containerRef)
	const [initialNavigation, setInitialNavigation] = React.useState(null)
	const [notificationPermission, setNotificationPermission] = React.useState('unset')
	const [notificationToken, setNotificationToken] = React.useState('none')

	// Load any resources or data that we need prior to rendering the app

	React.useEffect(() => {
		registerForPushNotificationsAsync(setNotificationPermission, setNotificationToken).then(async (token) => {
			Axios.post(`${ROOT_URL}/notifications/tokens`, { token })
			await SecureStorage.setItemAsync('notificationToken', token)
		})

		async function loadResourcesAndDataAsync() {
			try {
				SplashScreen.preventAutoHideAsync()

				// Load our initial navigation state
				setInitialNavigationState(await getInitialState())

				// Load fonts
				await Font.loadAsync({
					// Ionicons: require('@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf'),
					'poppins-bold': require('./assets/fonts/Poppins/Poppins-SemiBold.ttf'),
					'poppins-regular': require('./assets/fonts/Poppins/Poppins-Regular.ttf'),
					'poppins-light': require('./assets/fonts/Poppins/Poppins-Light.ttf'),
					'libre-bold': require('./assets/fonts/Libre_Baskerville/LibreBaskerville-Bold.ttf'),
					'libre-regular': require('./assets/fonts/Libre_Baskerville/LibreBaskerville-Regular.ttf'),
					'libre-italic': require('./assets/fonts/Libre_Baskerville/LibreBaskerville-Italic.ttf'),
					'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
				})
			} catch (e) {
				// We might want to provide this error information to an error reporting service
				console.warn(e)
			} finally {
				setFontLoadingComplete(true)
				SplashScreen.hideAsync()
			}
		}

		async function loadUser() {
			try {
				const token = await SecureStorage.getItemAsync('token')
				const userId = await SecureStorage.getItemAsync('userId')
				if (token && userId) {
					actions.auth(store.dispatch)(token)
					actions.getUser(store.dispatch)()
					setUserLoaded(true)
				}
			} catch (err) {
				console.error(err)
			}
		}

		async function loadNotificationSettings() {
			try {
				const token = await SecureStorage.getItemAsync('notificationToken')
				if (token) actions.getSettings(store.dispatch)(token)
				setNotificationSettingsLoaded(true)
			} catch (e) {
				console.error(e)
			}
		}

		if (!userLoaded) loadUser()

		if (!isFontLoadingComplete) loadResourcesAndDataAsync()

		if (!notificationSettingsLoaded) loadNotificationSettings()
	}, [])

	const lastNotificationResponse = Notifications.useLastNotificationResponse()
	React.useEffect(() => {
		const notificationContent =
			lastNotificationResponse?.notification?.request?.content
		if (notificationContent) {
			const { articleSlug } = notificationContent.data
			if (articleSlug) {
				actions
					.fetchAndReadArticle(store.dispatch)(articleSlug)
					.then(() => {
						if (containerMounted) {
							containerRef.current?.navigate('Article')
						}
					})
			}
		}
	}, [lastNotificationResponse])

	if (!isFontLoadingComplete) return null
	return (
		<Provider store={store}>
			<SafeAreaProvider>
				<SafeAreaView style={styles.container}>
					{Platform.OS === 'ios' && (
						<StatusBar style={styles.statusBar} barStyle="dark-content" />
					)}
					{!isFeedLoadingComplete && !props.skipLoadingScreen ? (
						<LoadingScreen
							completeLoading={() => setFeedLoadingComplete(true)}
						/>
					) : (
						<NavigationContainer
							ref={containerRef}
							initialState={initialNavigationState}
							onReady={() => setContainerMounted(true)}
						>
							<Stack.Navigator
								screenOptions={{ headerShown: false }}
								initialRouteName="Root"
							>
								<Stack.Screen
									name="Root"
									component={() => BottomTabNavigator({ notificationPermission, notificationToken })}
								/>
								<Stack.Screen
									name="Results"
									component={ResultsScreen}
								/>
								<Stack.Screen
									name="Article"
									component={ArticleScreen}
								/>
								<Stack.Screen name="Author" component={AuthorScreen} />
							</Stack.Navigator>
						</NavigationContainer>
					)}
					<ConnectedModal>
						{/* <View style={styles.modalBar}></View> */}
						<View style={styles.modalContainer}>
							<Auth></Auth>
						</View>
					</ConnectedModal>
				</SafeAreaView>
			</SafeAreaProvider>
		</Provider>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.paper,
		overflow: 'visible',
	},
	statusBar: {
		backgroundColor: Colors.paper,
	},
	modal: {
		backgroundColor: Colors.paper,
	},
	modalContainer: {
		backgroundColor: Colors.paper,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	closeModal: {
		zIndex: 1,
		position: 'absolute',
		top: 16,
		right: 16,
	},
})
