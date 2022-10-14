import * as React from 'react'
import { connect } from 'react-redux'
import { actions } from '../store'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Divider } from 'react-native-elements'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaInsetsContext } from 'react-native-safe-area-context'
import { Stack, Queue } from 'react-native-spacing-system'
import { Typography, CMS_URL, ROOT_URL } from '../constants'
import { Ionicons } from '@expo/vector-icons'
import HTML from 'react-native-render-html'
import PreviewCard from '../components/PreviewCard'
import axios from 'axios'
import { Analytics, PageHit } from 'expo-analytics';

const analytics = new Analytics('UA-336941941-Y');
analytics.hit(new PageHit('Author'))

class AuthorScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: props.route.params.name,
			slug: props.route.params.name.split(' ').join('-').toLowerCase(),
			previews: [],
			followed: false,
			author: {},
		}
	}

	checkFollowedAuthors = () => {
		//returns true if user following, false if not (or not signed in)
		if (Object.keys(this.props.user.data).length === 0) return false //user not signed in, user object is empty
		for (let author of this.props.user.data.followedAuthors) {
			if (author === this.state.slug) return true
		}
		return false
	}

	follow = async () => {
		alert('following')
	}

	/**
	 * This function is called by React when the component begins to mount (render).
	 * Here, we use it to initialize sample previews.
	 */
	componentDidMount = () => {
		const axios = require('axios')
		axios
			.get(`${ROOT_URL}/author/profile/` + this.state.slug)
			.then((response) => {
				const author = {
					name: response.data.author.name,
					initials: response.data.author.name
						.split(' ')
						.map(function (word, idx) {
							return idx == 0 ? ' ' + word[0] + '.' : word[0] + '.'
						})
						.join(''),
					readers: response.data.totalHits.toLocaleString(), // known issue, doesn't work on Android. hopefully works on ioS
					followers: response.data.author.followers.length,
					numArticles: response.data.totalArticles,
					bio: response.data.articles[0].authors[0].bio,
				}

				const previews = []
				for (let i = 0; i < author.numArticles; i += 1) {
					const currPreview = response.data.articles[i]
					let index = 0
					let trip = false
					if (currPreview.metadata != null) {
						for (let j = 0; j < currPreview.metadata.length; j++) {
							//ensures fetching of main tag, otherwise, might get a null value
							if (currPreview.metadata[j].label == 'kicker') {
								index = j
								trip = true
							}
						}
					}
					const preview = {
						articleID: currPreview.uuid,
						category:
							trip == true
								? currPreview.metadata[index].value.toUpperCase()
								: currPreview.tags[0].name.toUpperCase(),
						image: currPreview.dominantMedia.attachment_uuid,
						imageType:
							currPreview.dominantMedia.attachment_uuid == null
								? ''
								: currPreview.dominantMedia.extension.toLowerCase(),
						headline: currPreview.headline,
						article: currPreview,
						slug: currPreview.slug,
					}

					const copyOfPreview = JSON.parse(JSON.stringify(preview))
					previews.push(copyOfPreview) // copies the object so it's not referencing itself
				}

				this.setState({ previews: previews })
				this.setState({ author: author })
				this.setState({ followed: this.checkFollowedAuthors() })
			})
	}

	render() {
		return (
			<SafeAreaInsetsContext.SafeAreaConsumer>
				{(insets) => (
					<View style={[styles.authorScreen, { paddingTop: insets.top }]}>
						<ScrollView style={styles.scroll}>
							<Ionicons
								name="ios-arrow-back"
								size={30}
								color="black"
								onPress={this.props.navigation.goBack}
							/>
							<Stack size={18}></Stack>
							<View style={styles.authorInfo}>
								<View style={styles.authorPhoto}>
									<Text style={styles.initials}>
										{this.state.author.initials}{' '}
									</Text>
								</View>
								<Stack size={18}></Stack>
								<Text style={styles.authorName}>
									{this.state.author.name}
								</Text>
								<Stack size={10}></Stack>
								<View style={styles.followers}>
									<Text style={styles.followersText}>
										{this.state.author.readers} readers |
									</Text>
									<Queue size={10}></Queue>
									<Text style={styles.followersText}>
										{this.state.author.followers}
									</Text>
									{this.state.author.followers == 1 ? (
										<Text style={styles.followersText}>
											{' '}
											follower
										</Text>
									) : (
										<Text style={styles.followersText}>
											{' '}
											followers
										</Text>
									)}
								</View>
								{this.state.author.bio === '' ? (
									<Stack size={0}></Stack>
								) : (
									<Stack size={25}></Stack>
								)}
								<HTML // causing a warning on Android
									tagsStyles={{ p: styles.bio }} // heads up, styles do not trigger autorefresh on expo
									html={this.state.author.bio}
								/>
								{/* <Text style={styles.bio}>{this.state.author.bio}</Text> */}
								<Stack size={25}></Stack>
								<TouchableOpacity
									style={styles.followButton}
									onPress={this.follow}
								>
									{this.state.followed == false ? (
										<Text style={styles.followButtonText}>
											{' '}
											Follow
										</Text>
									) : (
										<Text style={styles.followButtonText}>
											{' '}
											Following
										</Text>
									)}
								</TouchableOpacity>
							</View>
							<Stack size={28}></Stack>
							<Divider
								style={{ backgroundColor: '#969696', height: 2 }}
							/>
							<Stack size={28}></Stack>
							<Text style={styles.published}>
								Published {this.state.author.numArticles} articles
							</Text>
							<Stack size={24}></Stack>
							{this.state.previews.map((preview, index) => {
								return (
									<View key={preview.slug}>
										<TouchableOpacity>
											<PreviewCard
												preview={preview}
												navigation={this.props.navigation}
											></PreviewCard>
										</TouchableOpacity>
										<Stack size={28}></Stack>
										{/* <Stack size={(index == this.state.previews.length - 1) ? 0 : 28}></Stack> */}
										{/* ^ displays funny on android (cuts off bottom text) -- how does it look on ios? */}
									</View>
								)
							})}
						</ScrollView>
					</View>
				)}
			</SafeAreaInsetsContext.SafeAreaConsumer>
		)
	}
}

export default connect(
	(store) => ({ user: store.user }),
	(dispatch) => ({ auth: actions.auth(dispatch) })
)(AuthorScreen)

const styles = StyleSheet.create({
	scroll: {
		padding: 30,
	},
	authorScreen: {
		flex: 1,
		backgroundColor: 'white',
	},
	authorInfo: {
		alignItems: 'center',
	},
	authorPhoto: {
		justifyContent: 'center',
		width: 100,
		height: 100,
		backgroundColor: '#C4C4C4',
		borderRadius: 50,
		alignItems: 'center',
	},
	authorName: {
		fontWeight: 'bold',
		fontSize: 32,
	},
	initials: {
		...Typography.h2,
		color: 'white',
	},
	followers: {
		alignItems: 'center',
		flexDirection: 'row',
	},
	followersText: {},
	bio: {
		...Typography.p,
	},
	followButton: {
		paddingVertical: 8,
		paddingHorizontal: 30,
		backgroundColor: '#969696',
		borderRadius: 10,
	},
	followButtonText: {
		...Typography.h3,
		color: 'white',
	},
	published: {
		...Typography.h3,
	},
	titleArea: {},
	title: {
		fontSize: 42,
		fontWeight: 'bold',
	},
	subtitle: {
		...Typography.h3,
	},
	titleImage: {},
})

// export default AuthorScreen;
