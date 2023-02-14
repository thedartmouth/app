import React from 'react'
import { StyleSheet, Text, Image, View } from 'react-native'
import { Input } from 'react-native-elements'
import { Box, Stack, Queue } from './layout'
import VoxButton from './VoxButton'
import { connect } from 'react-redux'
import { ROOT_URL, Colors, Typography } from '../constants'
import Constants from 'expo-constants'
import Axios from 'axios'
import * as SecureStorage from 'expo-secure-store'
import * as Notifications from 'expo-notifications'

async function registerForPushNotificationsAsync(
	setNotificationPermission,
	setNotificationToken
) {
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

class NotificationRequest extends React.Component {
	constructor(props) {
		super(props)
	}

	requestNotifications = () => {
		this.props.hide()
		registerForPushNotificationsAsync(
			(permission) => this.setState({ permission }),
			(token) => this.setState({ token })
		).then(async (token) => {
			if (token) {
				await SecureStorage.setItemAsync('notificationToken', token)
				Axios.post(`${ROOT_URL}/notifications/tokens`, { token })
			}
		})
	}

	render() {
		return (
			<Box dir="column" align="center" style={styles.container}>
				<Text style={styles.title}>Push Notifications</Text>
				<Stack size={12}></Stack>
				<Text style={styles.reason}>
					We curate for you the most noteworthy news around campus. Keep
					Dartmouth in your pocket.
				</Text>

				<Stack size={36}></Stack>
				<Image
					source={require('../assets/images/artwork/notifications.png')}
					style={styles.artwork}
				/>
				<Stack size={36}></Stack>
				<Box dir="column" style={styles.reasons}>
					<Box dir="row">
						<Text style={styles.reason}>-</Text>
						<Queue size={6}></Queue>
						<Text style={styles.reason}>
							Stay tuned to Dartmouth COVID-19 updates
						</Text>
					</Box>
					<Stack size={12}></Stack>
					<Box dir="row">
						<Text style={styles.reason}>-</Text>
						<Queue size={6}></Queue>
						<Text style={styles.reason}>
							Hear powerful student voices from the Mirror
						</Text>
					</Box>
					<Stack size={12}></Stack>
					<Box dir="row">
						<Text style={styles.reason}>-</Text>
						<Queue size={6}></Queue>
						<Text style={styles.reason}>
							Be the first to know what's happening on campus
						</Text>
					</Box>
				</Box>
				<Stack size={36}></Stack>
				<Box dir="row">
					<VoxButton
						title="Not now"
						variant="filled"
						hue="gray"
						flex={1}
						raised
						onPress={this.props.hide}
					></VoxButton>
					<Queue size={24}></Queue>
					<VoxButton
						title="Sure"
						variant="filled"
						hue="green"
						flex={1}
						raised
						onPress={this.requestNotifications}
					></VoxButton>
				</Box>
			</Box>
		)
	}
}

export default NotificationRequest

const styles = StyleSheet.create({
	container: {
		width: 300,
	},
	artwork: {
		width: 235,
		height: 165,
	},
	title: {
		...Typography.h2,
		...Typography.serifBold,
	},
	reasons: {},
	reason: {
		...Typography.p,
		color: Colors.pen,
		lineHeight: Typography.p.fontSize * 1.3,
	},
	inputStyle: {
		marginLeft: Typography.p.fontSize,
		...Typography.sansLight,
		color: Colors.pen,
		...Typography.p,
	},
})
