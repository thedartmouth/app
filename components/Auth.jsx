import React from 'react'
import { StyleSheet, Text, TouchableOpacity, Image, View } from 'react-native'
import { Input } from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'
import { Box, Stack, Queue } from '../components/layout'
import VoxButton from '../components/VoxButton'
import FullWidthImage from 'react-native-fullwidth-image'
import HTML from 'react-native-render-html'
import { connect } from 'react-redux'
import { Colors, Typography } from '../constants'
import actions from '../store/actions'

class Auth extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			mode: 'signup',
			name: {
				first: null,
				last: null,
			},
			email: null,
			password: null,
			error: null,
		}
	}

	switchMode = () => {
		this.setState((prevState) => {
			const defaultState = {
				name: {
					first: null,
					last: null,
				},
				email: null,
				password: null,
				error: null,
			}
			if (prevState.mode === 'signup') return { ...defaultState, mode: 'login' }
			else return { ...defaultState, mode: 'signup' }
		})
	}

	auth = () => {
		if (this.state.mode === 'login') {
			this.props
				.signIn(this.state.email, this.state.password)
				.then(() => {
					this.setState({ mode: 'welcome' })
				})
				.catch((e) => {
					this.setState({ error: e.message })
				})
		} else if (this.state.mode === 'signup') {
			this.props
				.signUp(this.state.name, this.state.email, this.state.password)
				.then(() => {
					this.setState({ mode: 'welcome' })
				})
				.catch((e) => {
					this.setState({ error: e.message })
				})
		}
	}

	render() {
		const lastNameInput = React.createRef()
		if (this.state.mode === 'welcome') {
			return (
				<Box dir="column" align="center" style={styles.container}>
					<Image
						source={require('../assets/images/icon.png')}
						style={styles.logo}
					/>
					<Stack size={24}></Stack>
					<Text style={styles.welcome}>
						Welcome, {this.props.user.data?.name?.first || 'there'}.
					</Text>
					<Stack size={24}></Stack>
					<VoxButton
						title="Start reading"
						variant="filled"
						hue="green"
						flex={1}
						raised
						onPress={this.props.hideAuthModal}
					></VoxButton>
				</Box>
			)
		}
		return (
			<Box dir="column" align="center" style={styles.container}>
				<Image
					source={require('../assets/images/icon.png')}
					style={styles.logo}
				/>
				<Stack size={24}></Stack>
				<Text style={styles.heading}>
					Join us — the voces clamantium in deserto.
				</Text>
				<Stack size={24}></Stack>
				<View style={styles.fatFormChild}>
					{this.state.mode === 'signup' ? (
						<Box
							dir="row"
							justify="between"
							align="end"
							style={styles.fatFormChild}
						>
							<View style={styles.nameInput}>
								<Input
									placeholder="First"
									value={this.state.name.first}
									onChangeText={(first) => {
										this.setState((prevState) => ({
											name: { ...prevState.name, first },
										}))
									}}
									errorStyle={{ color: 'red' }}
									errorMessage={this.state.error}
									leftIcon={{ type: 'ionicons', name: 'face' }}
									inputStyle={styles.inputStyle}
									onSubmitEditing={() => lastNameInput.current.focus()}
								/>
							</View>
							<View style={styles.nameInput}>
								<Input
									ref={lastNameInput}
									placeholder="Last"
									value={this.state.name.last}
									onChangeText={(last) => {
										this.setState((prevState) => ({
											name: { ...prevState.name, last },
										}))
									}}
									errorStyle={{ color: 'red' }}
									errorMessage={this.state.error}
									inputStyle={styles.inputStyle}
								/>
							</View>
						</Box>
					) : null}
					<Input
						placeholder="Email"
						value={this.state.email}
						onChangeText={(email) => {
							this.setState({ email })
						}}
						keyboardType="email-address"
						returnKeyType="next"
						errorStyle={{ color: 'red' }}
						errorMessage={this.state.error}
						leftIcon={{ type: 'ionicons', name: 'mail' }}
						inputStyle={styles.inputStyle}
					/>
					<Input
						placeholder="Password"
						value={this.state.password}
						onChangeText={(password) => {
							this.setState({ password })
						}}
						secureTextEntry
						returnKeyType="send"
						errorStyle={{ color: 'red' }}
						errorMessage={this.state.error}
						leftIcon={{ type: 'ionicons', name: 'lock' }}
						inputStyle={styles.inputStyle}
						onSubmitEditing={this.auth}
					/>
				</View>
				<Stack size={24}></Stack>
				<Box dir="row" justify="center" style={styles.fatFormChild}>
					<VoxButton
						title={this.state.mode === 'signup' ? 'Login' : 'Sign Up'}
						variant="hollow"
						hue="green"
						raised
						onPress={this.switchMode}
					></VoxButton>
					<Queue size={36}></Queue>
					<VoxButton
						title={this.state.mode === 'signup' ? 'Sign Up' : 'Login'}
						variant="filled"
						hue="green"
						raised
						loading={this.props.user.loadingAuth}
						onPress={this.auth}
					></VoxButton>
				</Box>
			</Box>
		)
	}
}

export default connect(
	(store) => ({
		user: store.user,
	}),
	(dispatch) => ({
		signUp: actions.signUp(dispatch),
		signIn: actions.signIn(dispatch),
		getUser: actions.getUser(dispatch),
		hideAuthModal: actions.hideAuthModal(dispatch),
	})
)(Auth)

const styles = StyleSheet.create({
	container: {
		width: 300,
	},
	logo: {
		width: 72,
		height: 72,
	},
	welcome: {
		...Typography.h2,
		...Typography.serifBold,
	},
	heading: {
		textAlign: 'center',
		...Typography.p,
		...Typography.serifBold,
	},
	inputStyle: {
		marginLeft: Typography.p.fontSize,
		...Typography.sansLight,
		color: Colors.pen,
		...Typography.p,
		// width: '100%',
		// flex: 1,
	},
	nameInput: {
		width: '50%',
	},
	fatFormChild: {
		width: '100%',
	},
})
