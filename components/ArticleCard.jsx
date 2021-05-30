import React from 'react'
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	TouchableHighlight,
	Image,
	View,
} from 'react-native'
import { Stack, Queue } from 'react-native-spacing-system'
import HTML from 'react-native-render-html'
import { connect } from 'react-redux'
import { Colors, Typography } from '../constants'
import { actions } from '../store'
import * as Haptics from 'expo-haptics'

function ArticleCard(props) {
	const { navigation } = props
	const [cardWidth, setCardWidth] = React.useState(null)
	const [imageRatio, setImageRatio] = React.useState(null)
	const [imageLoaded, setImageLoaded] = React.useState(false)

	React.useEffect(() => {
		if (props.article.imageURI) {
			Image.getSize(props.article.imageURI, (width, height) => {
				setImageRatio(height / width)
			})
		}
	}, [])

	return (
		<TouchableOpacity
			onPress={() => {
				if (Platform.OS === 'ios') {
				Haptics.selectionAsync()
				}
				props.readArticle(props.article)
				navigation.push('Article')
			}}
			// underlayColor={Colors.green}
			activeOpacity={0.6}
		>
			<View
				onLayout={(event) => {
					setCardWidth(event.nativeEvent.layout.width)
				}}
			>
				{props.article.imageURI && (
					<Image
						style={{ width: '100%', height: cardWidth * imageRatio }}
						source={{ uri: props.article.imageURI }}
						progressiveRenderingEnabled={true}
						onLoadEnd={() => setImageLoaded(true)}
					/>
				)}
				{props.article.imageURI && !imageLoaded && (
					<Stack
						size={
							!!cardWidth && !!imageRatio
								? cardWidth * imageRatio
								: props.article.imageHeight > 0
								? props.article.imageHeight
								: 200
						}
					></Stack>
				)}
				<Stack size={12} />
				<View style={[styles.tags, styles.padded]}>
					<Text style={styles.tag}>{props.article.category}</Text>
				</View>
				<Stack size={4} />
				<Text style={[styles.headline, styles.padded]}>
					{props.article.headline}
				</Text>
				{props.article.abstract ? (
					<React.Fragment>
						<Stack size={12} />
						<View style={styles.padded}>
							<HTML
								tagsStyles={{ p: styles.abstract, a: styles.links }}
								html={props.article.abstract}
								ignoredTags={['u']}
							></HTML>
						</View>
					</React.Fragment>
				) : null}
				<Stack size={12} />
				<View style={[styles.authors, styles.padded]}>
					<Text style={styles.author}>
						By{' '}
						{props.article.authors
							.map((author) => author.name)
							.join(', ')}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	)
}

export default connect(null, (dispatch) => ({
	readArticle: actions.readArticle(dispatch),
}))(ArticleCard)

const styles = StyleSheet.create({
	foo: {
		width: '100%',
		height: 300,
	},
	padded: {
		paddingHorizontal: 24,
	},
	tag: {
		textTransform: 'uppercase',
		alignSelf: 'flex-start',
		fontSize: 12,
		...Typography.sansBold,
		paddingVertical: 4,
		// paddingHorizontal: 12,
		// borderRadius: 8,
		// color: Colors.paper,
		// backgroundColor: Colors.green,
		color: Colors.green,
		// backgroundColor: Colors.green,
		overflow: 'hidden', // needed to show the borderRadius with backgroundColor
	},
	tags: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	headline: {
		...Typography.h3,
		...Typography.serifBold,
	},
	authors: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	author: {
		// ...Typography.p,
		fontSize: 12,
		...Typography.sansBold,
		color: Colors.pen,
		textTransform: 'uppercase',
	},
	authorAdd: {
		marginTop: 2,
	},
	abstract: {
		...Typography.p,
		...Typography.serifRegular,
		lineHeight: Typography.p.fontSize * 1.5,
		color: Colors.pen,
	},
	links: {
		...Typography.p,
		...Typography.serifRegular,
	},
})
