import * as React from 'react'
import { connect } from 'react-redux'
import {
	ActivityIndicator,
	StyleSheet,
	Text,
	View,
	FlatList,
	RefreshControl,
} from 'react-native'
import { SearchBar } from 'react-native-elements'
import { Divider } from 'react-native-elements'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Box, Stack, Queue } from '../components/layout'
import { Typography, Colors } from '../constants'
import { debounce } from 'debounce'
import { actions } from '../store'
import { utils } from '../lib'
import PreviewCard from '../components/PreviewCard'

const DiscoverTile = (props) => {
	return (
		<TouchableOpacity
			onPress={() => props.onPress(props.title)}
			style={[styles.tile, { backgroundColor: props.colors[0] }]}
		>
			<Text style={[styles.tileTitle, { color: props.colors[1] }]}>
				{props.title}
			</Text>
		</TouchableOpacity>
	)
}

class DiscoverScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			page: 1,
			query: null,
			mode: 'discovering',
		}
	}

	navigateToTag = (tag) => {
		this.props.discoverArticlesByTag(utils.convertTag(tag, 'api'), 1)
		this.props.navigation.push('Results', {
			tag,
			getMore: (currentPage) =>
				this.props.discoverArticlesByTag(
					utils.convertTag(tag, 'api'),
					currentPage
				),
		})
	}

	search = (query) => {
		this.setState({ page: 1, mode: 'searching' }, () => {
			this.props.searchArticles(query, this.state.page)
		})
	}

	debouncedSearch = debounce(this.search, 200)

	refresh = () => {
		if (this.state.query) {
			this.search(this.state.query)
		}
	}

	/**
	 * This function is called by React when the component begins to mount (render).
	 * Here, we use it to initialize a sample poll.
	 */

	render() {
		return (
			<View style={[styles.pollsScreen, { paddingTop: 0 }]}>
				<ScrollView style={styles.scroll}>
					<Stack size={24}></Stack>
					<View style={styles.titleArea}>
						<Text style={styles.title}>Discover</Text>
						<Stack size={12}></Stack>
						<SearchBar
							platform="default"
							lightTheme={true}
							returnKeyType="search"
							containerStyle={styles.searchContainer}
							inputContainerStyle={styles.searchInputContainer}
							placeholder="Vox quaerere..."
							onChangeText={(query) => {
								if (query) {
									this.setState({ query })
									this.debouncedSearch(query)
								}
							}}
							onClear={() => {
								this.setState({
									page: 1,
									query: null,
									mode: 'discovering',
								})
							}}
							onCancel={() => {
								this.setState({
									page: 1,
									query: null,
									mode: 'discovering',
								})
							}}
							value={this.state.query}
						/>
						{this.state.mode === 'searching' ? (
							<View>
								<Stack size={8}></Stack>
								<Text style={styles.hint}>
									{this.props.articles.totalResults > 0
										? `Here are ${
												this.props.articles.totalResults === 1000
													? 'over 1,000'
													: `${this.props.articles.totalResults}`
										  }`
										: 'We found no'}{' '}
									results
								</Text>
								<Stack size={8}></Stack>
							</View>
						) : (
							<Stack size={24}></Stack>
						)}
						{this.state.mode === 'searching' ? (
							<FlatList
								data={this.props.articles.results}
								refreshControl={
									<RefreshControl
										refreshing={this.props.articles.loadingResults}
										onRefresh={this.refresh}
									/>
								}
								onEndReached={() => {
									this.setState(
										(prevState) => ({ page: (prevState.page += 1) }),
										() => {
											// this.props.searchArticles(this.state.query, this.state.page);
										}
									)
								}} // set page to adding
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
						) : (
							<View>
								{/* <Box dir='column'>
                  <Box dir='row' style={{height: 200}}>
                    <Text style={[styles.tile, {flex: 3}]}>
                      Trendin
                    </Text>
                    <Box dir='column' style={{flex: 2}}>
                      <Text style={[styles.tile, {flex: 3}]}>
                        Opinion
                      </Text>
                      <Box dir='row' style={{flex: 1}}>
                        <Text style={[styles.tile, {flex: 3}]}>
                          COVID
                        </Text>
                        <Text style={[styles.tile, {flex: 2}]}>
                          Art
                        </Text>
                      </Box>
                    </Box>
                  </Box>
                </Box> */}
								<DiscoverTile
									title="COVID-19"
									colors={[Colors.theme[0], Colors.paper]}
									onPress={this.navigateToTag}
								/>
								<Stack size={24}></Stack>
								<DiscoverTile
									title="Mirror"
									colors={[Colors.theme[1], Colors.paper]}
									onPress={this.navigateToTag}
								/>
								<Stack size={24}></Stack>
								<DiscoverTile
									title="Arts"
									colors={[Colors.theme[2], Colors.paper]}
									onPress={this.navigateToTag}
								/>
								<Stack size={24}></Stack>
								<DiscoverTile
									title="Featured"
									colors={[Colors.theme[3], Colors.paper]}
									onPress={this.navigateToTag}
								/>
								<Stack size={24}></Stack>
								<DiscoverTile
									title="Opinion"
									colors={[Colors.theme[4], Colors.paper]}
									onPress={this.navigateToTag}
								/>
								<Stack size={24}></Stack>
								<DiscoverTile
									title="Sports"
									colors={[Colors.theme[5], Colors.paper]}
									onPress={this.navigateToTag}
								/>
								<Stack size={24}></Stack>
								<DiscoverTile
									title="Cartoon"
									colors={[Colors.theme[6], Colors.paper]}
									onPress={this.navigateToTag}
								/>
							</View>
						)}
					</View>
					<Stack size={24}></Stack>
				</ScrollView>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	pollsScreen: {
		flex: 1,
		backgroundColor: Colors.paper,
	},
	scroll: {
		paddingHorizontal: 36,
	},
	titleArea: {},
	title: {
		...Typography.serifBold,
		...Typography.h1,
	},
	titleImage: {},
	searchContainer: {
		backgroundColor: Colors.paper,
		borderTopWidth: 0, // override default {SearchBar} styling
		borderBottomWidth: 0, // override default {SearchBar} styling
		padding: 0, // override default {SearchBar} styling
	},
	searchInputContainer: {
		backgroundColor: Colors.shade, // override default {SearchBar} styling
		borderRadius: 12,
	},
	searchInput: {
		...Typography.sansRegular,
		color: Colors.charcoal,
	},
	hint: {
		...Typography.sansLight,
		fontSize: 10,
	},
	// tile: {
	//   width: '100%',
	//   height: '100%',
	//   textAlign: 'center',
	//   justifyContent: 'center',
	//   alignItems: 'center',
	//   backgroundColor: Colors.shade,
	//   color: Colors.charcoal,
	//   ...Typography.sansBold,
	//   ...Typography.h3,
	//   margin: 4,
	//   borderRadius: 8,
	// }
	tile: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.paper,
		height: 100,
		borderRadius: 12,
		shadowOffset: { height: 1 },
		shadowRadius: 4,
		shadowColor: 'gray',
		shadowOpacity: 0.3,
	},
	tileTitle: {
		...Typography.serifRegular,
		...Typography.h3,
	},
})

export default connect(
	(store) => ({
		articles: store.articles,
	}),
	(dispatch) => ({
		searchArticles: actions.searchArticles(dispatch),
		discoverArticlesByTag: actions.discoverArticlesByTag(dispatch),
	})
)(DiscoverScreen)
