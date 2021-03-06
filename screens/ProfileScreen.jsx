import * as React from 'react'
import { connect } from 'react-redux'
import { actions } from '../store'
import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native'
import { Divider } from 'react-native-elements'
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons'
import { Box, Stack, Queue } from '../components/layout'
import { Typography, Colors, POLICY_URL } from '../constants'
import ResultsScreen from './ResultsScreen'
import ArticleScreen from './ArticleScreen'
import * as Linking from 'expo-linking'
import HTML from 'react-native-render-html'
// import { createStackNavigator } from '@react-navigation/stack'
import VoxButton from '../components/VoxButton'
import { ScrollView } from 'react-native-gesture-handler'
import * as SecureStorage from 'expo-secure-store'

// const ProfileStack = createStackNavigator()

class ProfileScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			notificationToken: null,
		}
	}

	// componentDidMount() {
	// 	this.props.navigation.addListener('focus', () => {
	// 		this.checkAuth()
	// 	})
	// }

	checkAuth = () => {
		if (!this.props.user.lastAuth) {
			this.props.showAuthModal()
			return false
		} else return true
	}

	navigateProfileContent = (scenario) => {
		const authed = this.checkAuth()
		switch (scenario) {
			case 'BOOKMARKS':
				if (authed) {
					this.props.getBookmarks()
					this.props.navigation.push('Results', { bookmarks: true })
				}
				break
			case 'FOLLOWING':
				if (authed) alert('Feature coming soon!')
				break
			case 'POLLS':
				if (authed) alert('Feature coming soon!')
				break
		}
	}

	toggleNotificationSetting = async (tagSlug, status) => {
		const token = await SecureStorage.getItemAsync('notificationToken')
		if (token) {
			this.props.updateSetting(tagSlug, status, token)
		} else {
			this.props.showNotificationRequestModal()
		}
	}

	editProfileElement = (updatedProfile) => {
		const authed = this.checkAuth()
		if (authed) alert('Feature coming soon!')
	}

	render() {
		return (
			<View style={styles.profileScreen}>
				<ScrollView contentContainerStyle={styles.scroll}>
					<Stack size={72} />
					<View style={styles.intro}>
						<Text style={styles.title}>
							Hello, {this.props.user.data?.name?.first || 'there'}.
						</Text>
						<Stack size={24} />
						<Text style={styles.rewardText}>
							Good{' '}
							{new Date().getHours() < 12 - 1
								? 'morning'
								: new Date().getHours() < 18 - 1
								? 'afternoon'
								: 'evening'}
							.
						</Text>
						{/* <Box dir="row" align="center" style={styles.reward}>
						<SimpleLineIcons
							name="cup"
							size={24}
							color="black"
							style={styles.coffeeCup}
						/>
						<Queue size={8} />
						<Text style={styles.coffeeCount}>
							{this.props.user.data?.reads || 0}
						</Text>
						<Queue size={8} />
						<Text style={styles.rewardText}>coffee cups earned!</Text>
					</Box> */}
					</View>
					<Stack size={36} />
					<Divider style={styles.divider} />
					<Stack size={36} />
					<View style={styles.contentBoxes}>
						<View style={styles.contentBox}>
							<Text style={styles.heading}>Your stuff</Text>
							<Stack size={12} />
							<Divider style={styles.thinDivider} />
							<Stack size={4} />
							<TouchableOpacity
								style={styles.rowItem}
								onPress={() => this.navigateProfileContent('BOOKMARKS')}
							>
								<Text style={Typography.p}>Bookmarks</Text>
								<Ionicons
									name="ios-arrow-forward"
									size={24}
									style={styles.rowItemIcon}
								/>
							</TouchableOpacity>
							<Stack size={4} />
							<Divider style={styles.thinDivider} />
							<Stack size={4} />
							<TouchableOpacity
								style={styles.rowItem}
								onPress={() => this.navigateProfileContent('FOLLOWING')}
							>
								<Text style={Typography.p}>Followed authors</Text>
								<Ionicons
									name="ios-arrow-forward"
									size={24}
									style={styles.rowItemIcon}
								/>
							</TouchableOpacity>
							<Stack size={4} />
							<Divider style={styles.thinDivider} />
							{/* <Stack size={4} />
						<TouchableOpacity
							style={styles.rowItem}
							onPress={() => this.navigateProfileContent('POLLS')}
						>
							<Text style={Typography.p}>Completed polls</Text>
							<Ionicons
								name="ios-arrow-forward"
								size={24}
								style={styles.rowItemIcon}
							/>
						</TouchableOpacity>
						<Stack size={4} />
						<Divider style={styles.thinDivider} /> */}
						</View>
						<Stack size={24} />
						<View style={styles.contentBox}>
							<Text style={styles.heading}>Notification settings</Text>
							<Stack size={12} />
							{this.props.notification.settings ? (
								<>
									<Stack size={8} />
									{this.props.notification.settings.map(
										({ slug, name, active }) => {
											if (slug && name) {
												return (
													<React.Fragment key={slug}>
														<View style={styles.rowItem}>
															<Text style={Typography.p}>
																{name}
															</Text>
															<Switch
																value={active}
																onValueChange={() =>
																	this.toggleNotificationSetting(
																		slug,
																		!active
																	)
																}
															/>
														</View>
														<Stack size={8} />
													</React.Fragment>
												)
											} else return
										}
									)}
								</>
							) : null}
						</View>
					</View>
					<Stack size={36}></Stack>
					<HTML
						tagsStyles={{ a: styles.policy }}
						html={`<a href=${POLICY_URL}>Privacy Policy</a>`}
						onLinkPress={(_, href) => {
							Linking.openURL(href)
						}}
					></HTML>
					<Stack size={36}></Stack>
					{this.props.user.lastAuth ? (
						<>
							<VoxButton
								title="Logout"
								variant="hollow"
								hue="green"
								flex={1}
								// raised
								onPress={() => {
									this.props.deAuth()
									this.checkAuth()
								}}
							></VoxButton>
							<Stack size={36}></Stack>
						</>
					) : null}
				</ScrollView>
			</View>
		)
	}
}

export default connect(
	(store) => ({
		user: store.user,
		notification: store.notification,
	}),
	(dispatch) => ({
		deAuth: actions.deAuth(dispatch),
		getUser: actions.getUser(dispatch),
		showAuthModal: actions.showAuthModal(dispatch),
		getBookmarks: actions.getBookmarks(dispatch),
		getSettings: actions.getSettings(dispatch),
		updateSetting: actions.updateSetting(dispatch),
		showNotificationRequestModal: actions.showNotificationRequestModal(
			dispatch
		),
	})
)(ProfileScreen)

// export function ProfileStackScreen() {
//   return (
//     <ProfileStack.Navigator>
//       <ProfileStack.Screen name="Profile" component={ConnectedProfileScreen} />
//       <ProfileStack.Screen name="Bookmarks" component={ResultsScreen} />
//       <ProfileStack.Screen name="Articles" component={ArticleScreen}/>
//     </ProfileStack.Navigator>
//   );
// }

const styles = StyleSheet.create({
	profileScreen: {
		flex: 1,
		backgroundColor: Colors.paper,
	},
	scroll: {
		paddingHorizontal: 36,
		alignItems: 'stretch',
	},
	intro: {
		alignItems: 'center',
	},
	title: {
		...Typography.h1,
		...Typography.serifRegular,
	},
	reward: {},
	coffeeCup: {
		marginBottom: 2, // because the coffee icon is slightly imbalanced
	},
	rewardText: {
		...Typography.p,
		...Typography.serifRegular,
	},
	divider: {
		height: 1,
	},
	contentBoxes: {},
	contentBox: {},
	heading: {
		...Typography.h3,
		...Typography.sansBold,
		color: Colors.pen,
	},
	rowItem: {
		flex: 0,
		height: 31,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	rowItemIcon: {
		marginRight: 18,
	},
	thinDivider: {
		height: 0,
	},
	policy: {
		alignSelf: 'center',
		...Typography.sansRegular,
		...Typography.p,
	},
})
