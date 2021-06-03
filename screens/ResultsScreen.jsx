import * as React from 'react'
import { StyleSheet, View, FlatList, Text, RefreshControl } from 'react-native'
import { Divider } from 'react-native-elements'
import { Box, Stack } from '../components/layout'
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux'
import { Colors, Typography } from '../constants'
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
					<Box dir="row" justify="center" align="center" expand>
						<Ionicons
							name="ios-chevron-back"
							size={32}
							color={Colors.charcoal}
							onPress={this.props.navigation.goBack}
							style={styles.backButton}
						/>
						<Text style={styles.topTabTitle}>{this.state.title}</Text>
					</Box>
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
						keyExtractor={({ slug }) => slug}
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
		borderColor: Colors.border,
		borderStyle: 'solid',
		borderBottomWidth: 1,
		position: 'absolute',
		top: 0,
		width: '100%',
		height: 48,
	},
	backButton: {
		position: 'absolute',
		left: 36,
	},
	topTabTitle: {
		...Typography.serifBold,
		...Typography.h3,
		color: Colors.pen,
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
