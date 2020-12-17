import * as React from 'react'
import { StyleSheet, View, FlatList, Text, RefreshControl } from 'react-native'
import { Divider } from 'react-native-elements'
import { Box, Stack, Queue } from '../components/layout'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { Colors, CMS_URL, Typography } from '../constants'
import { SafeAreaConsumer } from 'react-native-safe-area-context'
import PreviewCard from '../components/PreviewCard'

class ResultsScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			type: null,
			title: 'Results',
			page: 1,
			onEndReachedCalledDuringMomentum: false,
		}
	}

	componentDidMount() {
		const { tag, bookmarks } = this.props.route.params
		if (tag) {
			this.setState({ type: 'TAG', title: tag })
		} else if (bookmarks) {
			this.setState({ type: 'BOOKMARKS', title: 'Bookmarks' })
		}
	}

	refresh = () => {
		console.log('refreshing')
		this.setState({ page: 1 }, () => {
			this.props.route.params.getMore(this.state.page)
		})
	}

	render() {
		return (
			<View style={styles.bookmarkScreen}>
				<Box dir="column" style={styles.topTab}>
					{/* <Queue size={36} /> */}
					<Box dir="row" justify="center" align="center" expand>
						<Ionicons
							name="ios-chevron-back"
							size={36}
							color={Colors.charcoal}
							onPress={this.props.navigation.goBack}
							style={styles.backButton}
						/>
						<Text style={styles.topTabTitle}>{this.state.title}</Text>
					</Box>
					<Stack size={12} />
				</Box>
				{this.props.articles.loadingResults ? null : (
					// <View style={styles.noBookmarks}>
					//   <MaterialIcons name="bookmark-border" size={35} color="gray" />
					//   <Text style={styles.noBookmarksTitle}>No articles bookmarked</Text>
					//   <Text style={styles.noBookmarksSubtitle}>
					//     Tap on the bookmark icon at the bottom of an article to add to
					//     your bookmarks
					//   </Text>
					// </View>
					<FlatList
						style={styles.scroll}
						data={this.props.articles.results}
						refreshControl={
							<RefreshControl
								refreshing={this.props.articles.loadingResults}
								onRefresh={this.refresh}
							/>
						}
						onMomentumScrollBegin={() => {
							console.log('scrolling again')
							this.setState({ onEndReachedCalledDuringMomentum: false })
						}}
						// onEndReachedThreshold={1}
						onEndReached={() => {
							console.log('end reached, trying')
							console.log(this.state.onEndReachedCalledDuringMomentum)
							if (
								!this.props.articles.loadingResults &&
								!this.state.onEndReachedCalledDuringMomentum
							) {
								this.setState({
									onEndReachedCalledDuringMomentum: true,
								})
								console.log('end reached, success')
							}
							// this.setState(prevState => ({page: prevState.page += 1}), () => {
							// this.props.route.params.getMore(this.state.page);
							// });
						}} // set page to adding
						ListHeaderComponent={
							this.props.articles.loadingResults ? null : (
								<View>
									<Stack size={0 + 72} />
									<Box dir="row" justify="between">
										<Text style={styles.hint}>Sorted by recency</Text>
										<Text style={styles.hint}>
											{this.props.articles.totalResults > 0
												? `${
														this.props.articles.totalResults ===
														1000
															? 'Over 1,000'
															: `${this.props.articles.totalResults}`
												  }`
												: 'No'}{' '}
											articles
										</Text>
									</Box>
								</View>
							)
						}
						ItemSeparatorComponent={Divider}
						ListFooterComponent={
							this.props.articles.loadingResults ? (
								<View>
									<Divider />
									<Stack size={36} />
									<ActivityIndicator animating size="large" />
								</View>
							) : null
						}
						renderItem={({ item }) => (
							<View key={item.slug}>
								<Stack size={18} />
								<PreviewCard
									article={item}
									navigation={this.props.navigation}
								/>
								<Stack size={18} />
							</View>
						)}
					/>
				)}
			</View>
		)
	}
}

export default connect((store) => ({
	articles: store.articles,
}))(ResultsScreen)

const styles = StyleSheet.create({
	bookmarkScreen: {
		flex: 1,
		backgroundColor: Colors.paper,
	},
	scroll: {
		flex: 1,
		paddingHorizontal: 36,
	},
	topTab: {
		backgroundColor: Colors.paper,
		zIndex: 1,
		// alignItems: 'center',
		borderColor: Colors.border,
		borderStyle: 'solid',
		borderBottomWidth: 1,
		// borderWidth: 1,
		position: 'absolute',
		top: 0,
		width: '100%',

		// borderColor: '#e5e6e9',
		// backgroundColor: 'white',
		// shadowOffset: { height: 3 },
		// shadowRadius: 10,
		// shadowColor: 'gray',
		// shadowOpacity: 0.3,
	},
	backButton: {
		position: 'absolute',
		left: 36,
	},
	topTabTitle: {
		...Typography.sansRegular,
		...Typography.h2,
		color: Colors.charcoal,
	},
	hint: {
		...Typography.sansLight,
		fontSize: 10,
	},
	noBookmarks: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		maxWidth: 250,
	},

	noBookmarksTitle: {
		lineHeight: 15,
		textAlign: 'center',
		color: 'gray',
	},

	noBookmarksSubtitle: {
		lineHeight: 20,
		textAlign: 'center',
		color: 'gray',
	},
})
