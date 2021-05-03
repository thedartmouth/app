/* eslint-disable no-underscore-dangle */
import * as React from 'react'
import {
	Alert,
	StyleSheet,
	Text,
	Image,
	View,
	Animated,
	Dimensions,
	Share,
	TouchableOpacity,
} from 'react-native'
import FullWidthImage from 'react-native-fullwidth-image'
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'
import HTML from 'react-native-render-html'
import * as Linking from 'expo-linking'
import { connect } from 'react-redux'
import { Typography, Colors, Layout } from '../constants'
import { utils } from '../lib'
import { Box, Stack, Queue } from '../components/layout'
import { actions } from '../store'
import dateFormat from 'dateformat'
import { Platform } from 'react-native'
import { SafeAreaConsumer } from 'react-native-safe-area-context'
import * as Haptics from 'expo-haptics'

class ArticleScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			shareButtonPressed: false,
		}
	}

	goBack = () => {
		this.props.navigation.goBack()
		this.props.exitArticle()
	}

	onShare = async () => {
		this.setState({ shareButtonPressed: true })
		try {
			const result = await Share.share({
				url: `https://www.thedartmouth.com/article/${this.props.articles.current.slug}`,
			})
			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error) {
			console.log(error.message)
		} finally {
			this.setState({ shareButtonPressed: false })
		}
	}

	visitAuthor = (author) => {
		Alert.alert(
			`Articles by ${author.name}`,
			'You will be able to browse articles by authors soon.',
			[
				//   {
				// 	text: "Cancel",
				// 	onPress: () => console.log("Cancel Pressed"),
				// 	style: "cancel"
				//   },
				{ text: 'Woo!' },
			],
			{ cancelable: false }
		)
		// this.props.navigation.push('Author', author);
	}

	navigateToTag = (tag) => {
		this.props.discoverArticlesByTag(tag, 1)
		this.props.navigation.push('Results', {
			tag: utils.convertTag(tag, 'view'),
			getMore: (currentPage) =>
				this.props.discoverArticlesByTag(tag, currentPage),
		})
	}

	renderArticleActions = () => {
		return (
			<Box dir="row">
				{this.props.articles.current.bookmarked ||
				this.props.articles.pendingBookmarks.includes(
					this.props.articles.current.slug
				) ? (
					<Ionicons
						name="ios-bookmark"
						size={32}
						color="gray"
						onPress={() => {
							Haptics.impactAsync()
							this.props.bookmarkArticle(
								this.props.articles.current.slug
							)
						}}
					/>
				) : (
					<Ionicons
						name="ios-bookmark-outline"
						size={32}
						color="gray"
						onPress={() => {
							Haptics.impactAsync()
							this.props.bookmarkArticle(
								this.props.articles.current.slug
							)
						}}
					/>
				)}
				<Queue size={12}></Queue>
				<Ionicons
					name={
						this.state.shareButtonPressed
							? 'ios-share'
							: 'ios-share-outline'
					}
					size={32}
					color={Colors.charcoal}
					onPress={() => {
						Haptics.impactAsync()
						this.onShare()
					}}
				/>
			</Box>
		)
	}

	render() {
		const date = this.props.articles.current?.date
			? dateFormat(
					this.props.articles.current.date,
					'dddd, m/d/yy @ h:MM TT'
			  )
			: 'Unknown publish date'

		// const minScroll = 100;

		// const scrollY = new Animated.Value(0)

		// const clampedScrollY = scrollY.interpolate({
		// inputRange: [minScroll, minScroll + 1],
		// outputRange: [0, 1],
		// extrapolateLeft: 'clamp',
		// });

		// const minusScrollY = Animated.multiply(clampedScrollY, -1);

		// const translateY = Animated.diffClamp(
		// minusScrollY,
		// -48,
		// 0,
		// );

		// const opacity = translateY.interpolate({
		// inputRange: [-48, 0],
		// outputRange: [0.4, 1],
		// extrapolate: 'clamp',
		// });

		// animation
		const scrollY = new Animated.Value(0)
		const translateYTop = (step) =>
			Animated.diffClamp(scrollY, -48, step).interpolate({
				inputRange: [0, step],
				outputRange: [0, -step],
				extrapolateLeft: 'clamp',
			})
		const translateYBottom = Animated.diffClamp(scrollY, 0, 192).interpolate({
			inputRange: [0, 192],
			outputRange: [0, 96],
		})
		const opacityButton = Animated.diffClamp(scrollY, 0, 40).interpolate({
			inputRange: [0, 40],
			outputRange: [1, 0],
		})

		if (!this.props.articles.current) return null
		else
			return (
				<SafeAreaConsumer style={styles.screen}>
					{(insets) => (
						<View
							style={[styles.screen, { marginBottom: -insets.bottom }]}
						>
							{Platform.OS === 'ios' ? (
								<Animated.View
									style={{
										transform: [{ translateY: translateYTop(48) }],
										zIndex: 1,
									}}
								>
									<Box
										dir="column"
										justifyContent="center"
										style={styles.topTab}
									>
										<Box
											dir="row"
											justify="between"
											align="center"
											style={styles.padded}
										>
											<Ionicons
												name="ios-chevron-back"
												size={32}
												color={Colors.charcoal}
												onPress={this.goBack}
											/>
											{this.renderArticleActions()}
										</Box>
									</Box>
								</Animated.View>
							) : (
								<Box
									dir="column"
									justifyContent="center"
									style={styles.topTab}
								>
									<Box
										dir="row"
										justify="between"
										align="center"
										style={styles.padded}
									>
										<Ionicons
											name="ios-chevron-back"
											size={32}
											color={Colors.charcoal}
											onPress={this.goBack}
										/>
										{this.renderArticleActions()}
									</Box>
								</Box>
							)}
							<ScrollView
								onScroll={(e) => {
									scrollY.setValue(
										Math.max(e.nativeEvent.contentOffset.y, -48)
									)
								}}
								scrollEventThrottle={16}
								bounces={true}
								automaticallyAdjustContentInsets={false}
							>
								<Stack size={72} />
								<View style={[styles.tags, styles.padded]}>
									{this.props.articles.current.tags.map((tag) => (
										<View key={tag} style={styles.tagContainer}>
											<TouchableOpacity
												onPressOut={() => this.navigateToTag(tag)}
											>
												<Text style={styles.tag}>#{tag}</Text>
											</TouchableOpacity>
											<Queue size={8} />
											<Stack size={24} />
										</View>
									))}
								</View>
								<Text style={[styles.articleTitle, styles.padded]}>
									{this.props.articles.current.headline}
								</Text>
								<Stack size={12} />
								<View style={[styles.authorViewsArea, styles.padded]}>
									<View style={styles.authorArea}>
										{this.props.articles.current.authors.map(
											(author, idx) => (
												<TouchableOpacity
													key={author.slug}
													navigation={this.props.navigation}
													onPress={() => {
														this.visitAuthor(author)
													}}
												>
													<Box dir="row" align="center">
														<Text style={styles.author}>
															{author.name}
														</Text>
														{/* <Queue size={4} />
												<Ionicons
													style={styles.authorAdd}
													name="ios-add"
													size={18}
													color="gray"
												/> */}
														{idx <
														this.props.articles.current.authors
															.length -
															1 ? (
															<Queue size={8}></Queue>
														) : null}
													</Box>
												</TouchableOpacity>
											)
										) || (
											<Text style={styles.author}>
												No authorship
											</Text>
										)}
									</View>
								</View>
								{props.article.imageURI && (
									<FullWidthImage
										source={{
											uri: this.props.articles.current.imageURI,
										}}
									/>
								)}
								<Stack size={12} />
								<View style={styles.padded}>
									<Box dir="row" justify="between">
										<Text style={styles.details}>{date}</Text>
										<Text style={styles.details}>
											{this.props.articles.current.reads || 0}{' '}
											{this.props.articles.current.reads === 1
												? 'view'
												: 'views'}
										</Text>
									</Box>
									<Stack size={12}></Stack>
									{this.props.articles.current.body ? (
										<HTML
											tagsStyles={{
												p: styles.content,
												strong: {
													fontSize: 16,
													fontFamily: 'libre-bold',
													color: Colors.pen,
													lineHeight: 16 * 1.7,
													marginBottom: 16,
												},
												a: styles.links,
											}}
											classesStyles={{
												'pull-quote': {
													backgroundColor: Colors.shade,
													padding: 24,
													borderRadius: 8,
													borderBottomWidth: 8,
													borderColor: Colors.green,
													borderStyle: 'solid',
													marginBottom: 36,
												},
												'pull-quote-body': {
													fontSize: 18,
													fontFamily: 'libre-regular',
													marginBottom: 4,
												},
												'pull-quote-byline': {
													marginTop: 4,
													fontWeight: 'bold',
													fontSize: 16,
												},
											}}
											html={this.props.articles.current.body}
											onLinkPress={(event, href) => {
												Linking.openURL(href)
											}}
											imagesMaxWidth={
												Dimensions.get('window').width -
												Layout.margins.horizontal * 2
											}
										/>
									) : null}
								</View>
								<Stack size={12}></Stack>
								<Box dir="row" justify="center">
									<Image
										source={require('../assets/images/icon-light.png')}
										style={styles.logo}
									/>
								</Box>
								<View>
									<Stack size={72}></Stack>
								</View>
							</ScrollView>
							{/* <Animated.View
						style={
							Platform.OS === 'ios'
								? {
										transform: [{ translateY: translateYBottom }],
								  }
								: {
										// opacity: opacityButton
								  }
						}
					>
						<View style={styles.bottomTab}>
							<Stack size={12} />
							<View style={styles.bottomTabButtons}>
							</View>
						</View>
					</Animated.View> */}
						</View>
					)}
				</SafeAreaConsumer>
			)
	}
}

export default connect(
	(store) => ({
		articles: store.articles,
	}),
	(dispatch) => ({
		exitArticle: actions.exitArticle(dispatch),
		bookmarkArticle: actions.bookmarkArticle(dispatch),
		discoverArticlesByTag: actions.discoverArticlesByTag(dispatch),
	})
)(ArticleScreen)

// alert(Layout.margins.horizontal)

const styles = StyleSheet.create({
	screen: {
		backgroundColor: Colors.paper,
		flex: 1,
	},
	padded: {
		paddingHorizontal: Layout.margins.horizontal,
	},
	topTab: {
		zIndex: 1,
		// alignItems: 'center',
		borderColor: Colors.border,
		borderStyle: 'solid',
		borderBottomWidth: 1,
		// borderWidth: 1,
		position: 'absolute',
		top: 0,
		width: '100%',
		backgroundColor: Colors.paper,
		height: 48,
		// borderColor: '#e5e6e9',
		// backgroundColor: 'white',
		// shadowOffset: { height: 3 },
		// shadowRadius: 10,
		// shadowColor: 'gray',
		// shadowOpacity: 0.3,
	},
	intro: {
		alignItems: 'flex-start',
	},
	articleTitle: {
		...Typography.h2,
		...Typography.serifBold,
	},
	tagContainer: {
		flexDirection: 'row',
	},
	tags: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	tag: {
		textTransform: 'uppercase',
		alignSelf: 'flex-start',
		fontSize: 12,
		...Typography.sansBold,
		// paddingVertical: 4,
		// paddingHorizontal: 12,
		// borderRadius: 8,
		// color: Colors.paper,
		// backgroundColor: Colors.green,
		color: Colors.green,
		// backgroundColor: Colors.green,
		overflow: 'hidden', // needed to show...Typography.sans,
	},
	authorViewsArea: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		flex: 1,
		// flexWrap: 'wrap',
	},
	authorArea: {
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	author: {
		alignSelf: 'flex-start',
		fontSize: 12,
		...Typography.sansRegular,
		paddingVertical: 4,
		paddingHorizontal: 12,
		marginBottom: 12,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: Colors.green,
		color: Colors.green,
		backgroundColor: Colors.white,
		overflow: 'hidden', // needed to show the borderRadius with backgroundColor
	},
	authorAdd: {
		marginTop: 3, // correction
	},
	details: {
		...Typography.sansLight,
		fontSize: 10,
		color: Colors.pen,
	},
	content: {
		...Typography.p,
		...Typography.serifRegular,
		color: Colors.pen,
		lineHeight: Typography.p.fontSize * 1.7,
		marginBottom: 16,
	},
	contentStrong: {
		...Typography.serifBold,
	},
	links: {
		...Typography.p,
		...Typography.serifRegular,
	},
	bottomTab: {
		borderTopWidth: 1,
		borderColor: Colors.border,
		position: 'absolute',
		bottom: 0,
		width: '100%',
		zIndex: 1,
		backgroundColor: Colors.paper,
		height: 72,
	},
	bottomTabButtons: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
	},
	logo: {
		height: 48,
		resizeMode: 'contain',
	},
})
