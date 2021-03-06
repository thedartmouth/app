import * as WebBrowser from 'expo-web-browser'
import * as React from 'react'
import {
	Alert,
	Button,
	Image,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	flex,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { MonoText } from '../components/StyledText'

export default function HomeScreen() {
	return (
		<View style={styles.container}>
			<ScrollView
				style={styles.container}
				contentContainerStyle={styles.contentContainer}
			>
				<View style={styles.welcomeContainer}>
					<Image
						source={
							__DEV__
								? require('../assets/images/icon-light.png')
								: require('../assets/images/robot-prod.png')
						}
						style={styles.welcomeImage}
					/>
				</View>

				<View style={styles.getStartedContainer}>
					<DevelopmentModeNotice />

					<Text style={styles.getStartedText}>
						Open up the code for this screen:
					</Text>

					<View
						style={[
							styles.codeHighlightContainer,
							styles.homeScreenFilename,
						]}
					>
						<MonoText>screens/HomeScreen.js</MonoText>
					</View>

					<Text style={styles.getStartedText}>
						Change any of the text, save the file, and your app will
						automatically reload.
					</Text>

					<Button
						title="Hello!"
						color="#841584"
						accessibilityLabel="Learn more about this purple button"
					/>
				</View>

				<View style={styles.buttonDemo}>
					<Button
						color="#ff5c5c"
						title="Button 1"
						onPress={() => Alert.alert('Cannot press this one')}
					/>

					<Button
						color="#00008b"
						title="Button 2"
						onPress={() => Alert.alert('Cannot press this one')}
					/>

					<Button
						color="#a52a2a"
						title="Button 3"
						onPress={() => Alert.alert('Cannot press this one')}
					/>

					<Button
						color="#8a2be2"
						title="Button 4"
						onPress={() => Alert.alert('Cannot press this one')}
					/>
				</View>

				<View style={styles.helpContainer}>
					<TouchableOpacity
						onPress={handleHelpPress}
						style={styles.helpLink}
					>
						<Text style={styles.helpLinkText}>
							Help, it didn???t automatically reload!
						</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.buttonContainer}>
					<View style={styles.button}>
						<TouchableOpacity onPress={handleFirstButton}>
							<Text style={styles.getStartedText}>
								This is a button{' '}
							</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.button}>
						<TouchableOpacity onPress={handleFirstButton}>
							<Text style={styles.buttonText}>
								This is a larger button{' '}
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>

			<View style={styles.tabBarInfoContainer}>
				<Text style={styles.tabBarInfoText}>
					This is a tab bar. You can edit it in:
				</Text>

				<View
					style={[
						styles.codeHighlightContainer,
						styles.navigationFilename,
					]}
				>
					<MonoText style={styles.codeHighlightText}>
						navigation/BottomTabNavigator.js
					</MonoText>
				</View>
			</View>
		</View>
	)
}

HomeScreen.navigationOptions = {
	header: null,
}

function DevelopmentModeNotice() {
	if (__DEV__) {
		const learnMoreButton = (
			<Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
				Learn more
			</Text>
		)

		return (
			<Text style={styles.developmentModeText}>
				Welcome to the React Native + Expo development space for The
				Dartmouth's mobile app. {learnMoreButton}
			</Text>
		)
	}
	return (
		<Text style={styles.developmentModeText}>
			You are not in development mode: your app will run at full speed.
		</Text>
	)
}

function handleLearnMorePress() {
	WebBrowser.openBrowserAsync(
		'https://github.com/thedartmouth/mobile/tree/master'
	)
}

function handleHelpPress() {
	WebBrowser.openBrowserAsync(
		'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
	)
}

function handleFirstButton() {
	alert('button pressed')
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
	developmentModeText: {
		marginBottom: 20,
		color: 'rgba(0,0,0,0.4)',
		fontSize: 14,
		lineHeight: 19,
		textAlign: 'center',
	},
	contentContainer: {
		paddingTop: 30,
	},
	welcomeContainer: {
		alignItems: 'center',
		marginTop: 10,
		marginBottom: 20,
	},
	welcomeImage: {
		width: 100,
		height: 80,
		resizeMode: 'contain',
		marginTop: 3,
		marginLeft: -10,
	},
	getStartedContainer: {
		alignItems: 'center',
		marginHorizontal: 50,
	},
	homeScreenFilename: {
		marginVertical: 7,
	},
	codeHighlightText: {
		color: 'rgba(96,100,109, 0.8)',
	},
	codeHighlightContainer: {
		backgroundColor: 'rgba(0,0,0,0.05)',
		borderRadius: 3,
		paddingHorizontal: 4,
	},
	getStartedText: {
		fontSize: 17,
		color: 'rgba(96,100,109, 1)',
		lineHeight: 24,
		textAlign: 'center',
	},
	buttonContainer: {
		display: flex,
	},
	button: {
		alignItems: 'center',
		marginBottom: 10,
		alignSelf: 'center',
		backgroundColor: '#DDDDDD',
		padding: 10,
	},
	buttonText: {
		color: '#4c4baf',
		fontSize: 20,
	},
	tabBarInfoContainer: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		right: 0,
		...Platform.select({
			ios: {
				shadowColor: 'black',
				shadowOffset: { width: 0, height: -3 },
				shadowOpacity: 0.1,
				shadowRadius: 3,
			},
			android: {
				elevation: 20,
			},
		}),
		alignItems: 'center',
		backgroundColor: '#fbfbfb',
		paddingVertical: 15,
	},
	tabBarInfoText: {
		fontSize: 17,
		color: 'rgba(96,100,109, 1)',
		textAlign: 'center',
	},
	navigationFilename: {
		marginTop: 5,
	},
	helpContainer: {
		marginTop: 15,
		alignItems: 'center',
	},
	helpLink: {
		paddingVertical: 15,
	},
	helpLinkText: {
		fontSize: 14,
		color: '#2e78b7',
	},
	buttonDemo: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
	},
	button1: {},
	button2: {},
	button3: {},
})
