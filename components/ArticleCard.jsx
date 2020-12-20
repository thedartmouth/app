import React from 'react'
import { StyleSheet, Text, TouchableOpacity, TouchableHighlight, View } from 'react-native'
import FullWidthImage from 'react-native-fullwidth-image'
import { Stack, Queue } from 'react-native-spacing-system'
import HTML from 'react-native-render-html'
import { connect } from 'react-redux'
import { Colors, Typography } from '../constants'
import { actions } from '../store'
import * as Haptics from 'expo-haptics';

function ArticleCard(props) {
	const { navigation } = props

	return (
		<TouchableOpacity
			onPress={() => {
				Haptics.selectionAsync()
				props.readArticle(props.article)
				navigation.push('Article')
			}}
			// underlayColor={Colors.green}
			activeOpacity={0.6}
		>
			<View>
				<FullWidthImage source={{ uri: props.article.imageURI }} />
				<Stack size={12} />
				<View style={[styles.tags, styles.padded]}>
					<Text style={styles.tag}>
						{props.article.category}
					</Text>
					{/* {props.article.tags.map((tag) => (
						<View key={tag} style={styles.tagContainer}>
							<Text style={styles.tag}>{tag}</Text>
							<Queue size={8} />
							<Stack size={32}></Stack>
						</View>
					))} */}
				</View>
				<Stack size={4} />
				<Text style={[styles.headline, styles.padded]}>
					{props.article.headline}
				</Text>
				<Stack size={12} />
				<View style={styles.padded}>
					<HTML
						tagsStyles={{ p: styles.abstract, a: styles.links }}
						html={props.article.abstract}
						ignoredTags={['u']}
					></HTML>
				</View>
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
	tagContainer: {
		flexDirection: 'row',
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
