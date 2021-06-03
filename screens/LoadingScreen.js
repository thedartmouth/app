import * as React from 'react'
import { connect } from 'react-redux'
import { actions } from '../store'
import { Animated, Image, StyleSheet, View } from 'react-native'
import * as SecureStore from 'expo-secure-store'
import { Stack } from 'react-native-spacing-system'
import dateFormat from 'dateformat'
import { Typography, Colors } from '../constants'

class LoadingScreen extends React.Component {
	constructor(props) {
		super(props)
		this.opacity = new Animated.Value(0)
	}

	componentDidMount() {
		const authUser = async () => {
			const userId = await SecureStore.getItemAsync('userId')
			const token = await SecureStore.getItemAsync('token')
			if (userId && token) {
				await this.props.getUser(userId, token)
			}
		}
		const loadingPromises = [authUser, this.props.refreshFeed()]
		Promise.all(loadingPromises).then(() => {
			setTimeout(() => {
				this.props.completeLoading()
			}, 1000)
		})
	}

	onLoad = () => {
		Animated.timing(this.opacity, {
			toValue: 1,
			duration: 2000,
			useNativeDriver: true,
		}).start()
	}

	render() {
		return (
			<View style={styles.screen}>
				<Image
					source={require('../assets/images/banner.png')}
					style={styles.banner}
				/>
				<Stack size={24}></Stack>
				<Animated.Text
					onLoad={this.onLoad()}
					style={[
						{
							opacity: this.opacity,
							transform: [
								{
									scale: this.opacity.interpolate({
										inputRange: [0, 1],
										outputRange: [0.85, 1],
									}),
								},
							],
						},
						styles.date,
					]}
				>
					{dateFormat(new Date(), 'dddd — mmm d, yyyy')}
				</Animated.Text>
			</View>
		)
	}
}

export default connect(
	(store) => ({
		articles: store.articles,
	}),
	(dispatch) => ({
		refreshFeed: actions.refreshFeed(dispatch),
		getUser: actions.getUser(dispatch),
	})
)(LoadingScreen)

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: Colors.paper,
		justifyContent: 'center',
		alignItems: 'center',
	},
	banner: {
		height: 36,
		resizeMode: 'contain',
	},
	date: {
		...Typography.serifRegular,
		...Typography.p,
		color: Colors.charcoal,
	},
})
