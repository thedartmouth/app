/* eslint-disable no-underscore-dangle */
import * as React from 'react'
import {
	StyleSheet,
	Text,
	View,
	Image,
	Animated,
	Dimensions,
	Share,
	TouchableOpacity,
} from 'react-native'
import FullWidthImage from 'react-native-fullwidth-image'
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { SafeAreaConsumer, useSafeArea } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import HTML from 'react-native-render-html'
import { Linking } from 'expo'
import { connect } from 'react-redux'
import { Typography, Colors } from '../constants'
import { Box, Stack, Queue } from '../components/layout'
import { actions } from '../store'
import dateFormat from 'dateformat'
import { Platform } from 'react-native'

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
		alert('Feature coming soon!')
		// this.props.navigation.push('Author', author);
	}

	render() {
		const date = this.props.articles.current?.date
			? dateFormat(
					this.props.articles.current.date,
					'dddd, m/d/yy @ h:MM TT'
			  )
			: 'Unknown publish date'

		// animation
		const scrollY = new Animated.Value(0)
		const translateYTop = (step) =>
			Animated.diffClamp(scrollY, 0, step).interpolate({
				inputRange: [0, step],
				outputRange: [0, -step],
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
				<View style={styles.screen}>
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
								<Box dir="row">
									<Queue size={36} />
									<Animated.View style={{ opacity: opacityButton }}>
										<Ionicons
											name="ios-chevron-back"
											size={36}
											color={Colors.charcoal}
											onPress={this.goBack}
										/>
									</Animated.View>
								</Box>
							</Box>
						</Animated.View>
					) : null}
					<ScrollView
						onScroll={(e) => {
							scrollY.setValue(e.nativeEvent.contentOffset.y)
						}}
						scrollEventThrottle={16}
						bounces={false}
					>
						{Platform.OS === 'ios' ? (
							<Stack size={72} />
						) : (
							<View>
								<Box dir="row">
									<Queue size={36} />
									<Animated.View style={{ opacity: opacityButton }}>
										<Ionicons
											name="ios-chevron-back"
											size={36}
											color={Colors.charcoal}
											onPress={this.goBack}
										/>
									</Animated.View>
									<Stack size={48}></Stack>
								</Box>
							</View>
						)}
						<View style={[styles.tags, styles.padded]}>
							{this.props.articles.current.tags.map((tag) => (
								<View key={tag} style={styles.tagContainer}>
									<Text style={styles.tag}>{tag}</Text>
									<Queue size={8} />
									<Stack size={32} />
								</View>
							))}
						</View>
						<Stack size={4} />
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
												<Queue size={4} />
												<Ionicons
													style={styles.authorAdd}
													name="ios-add"
													size={18}
													color="gray"
												/>
												{idx <
												this.props.articles.current.authors.length -
													1 ? (
													<Queue size={8}></Queue>
												) : null}
											</Box>
										</TouchableOpacity>
									)
								) || <Text style={styles.author}>No authorship</Text>}
							</View>
						</View>
						<Stack size={12} />
						<FullWidthImage
							source={{
								uri: this.props.articles.current.imageURI,
							}}
						/>
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
										}
									}}
									html={this.props.articles.current.body}
									onLinkPress={(event, href) => {
										Linking.openURL(href)
									}}
									imagesMaxWidth={
										Dimensions.get('window').width - 36 * 2
									}
								/>
							) : null}
						</View>
						<View>
							<Stack size={144}></Stack>
						</View>
					</ScrollView>
					<Animated.View
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
								<Ionicons
									name="ios-heart-outline"
									size={36}
									color={Colors.charcoal}
									onPress={() => alert('Feature coming soon!')}
								/>
								{this.props.articles.current.bookmarked ||
								this.props.articles.pendingBookmarks.includes(
									this.props.articles.current.slug
								) ? (
									<Ionicons
										name="ios-bookmark"
										size={36}
										color="gray"
										onPress={() =>
											this.props.bookmarkArticle(
												this.props.articles.current.slug
											)
										}
									/>
								) : (
									<Ionicons
										name="ios-bookmark-outline"
										size={36}
										color="gray"
										onPress={() =>
											this.props.bookmarkArticle(
												this.props.articles.current.slug
											)
										}
									/>
								)}
								<Ionicons
									name={
										this.state.shareButtonPressed
											? 'ios-share'
											: 'ios-share-outline'
									}
									size={36}
									color={Colors.charcoal}
									onPress={this.onShare}
								/>
							</View>
						</View>
					</Animated.View>
				</View>
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
	})
)(ArticleScreen)

const styles = StyleSheet.create({
	screen: {
		backgroundColor: Colors.paper,
		flex: 1,
	},
	padded: {
		paddingHorizontal: 36,
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
		alignSelf: 'flex-start',
		paddingVertical: 4,
		paddingHorizontal: 12,
		borderRadius: 8,
		fontSize: 12,
		...Typography.sansBold,
		color: Colors.paper,
		backgroundColor: Colors.green,
		overflow: 'hidden', // needed to show the borderRadius with backgroundColor
		textTransform: 'uppercase',
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
		color: Colors.charcoal,
		...Typography.p,
		...Typography.sans,
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
		...Typography.serifBold
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
})
