import * as React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import FullWidthImage from 'react-native-fullwidth-image'
import { Stack, Queue } from 'react-native-spacing-system'
import { Typography, Colors } from '../constants'
import { connect } from 'react-redux'
import { actions } from '../store'

function PreviewCard(props) {
	return (
		<TouchableOpacity
			onPress={() => {
				props.readArticle(props.article)

				props.navigation.push('Article')
			}}
		>
			<Text style={styles.category}>{props.article.category}</Text>
			<View style={styles.infoBox}>
				<View style={styles.textArea}>
					<Stack size={4}></Stack>
					<Text style={styles.headline}>{props.article.headline}</Text>
				</View>
				<Queue size={12} />
				<View style={styles.imageContainer}>
					{props.article.imageURI && (
						<FullWidthImage source={{ uri: props.article.imageURI }} />
					)}
				</View>
			</View>
		</TouchableOpacity>
	)
}

export default connect(null, (dispatch) => ({
	readArticle: actions.readArticle(dispatch),
}))(PreviewCard)

const styles = StyleSheet.create({
	infoBox: {
		flexDirection: 'row',
	},
	textArea: {
		flex: 2,
	},
	category: {
		color: Colors.green,
		fontSize: 10,
		...Typography.sansBold,
		textTransform: 'uppercase',
	},
	headline: {
		...Typography.p,
		...Typography.serifBold,
	},
	imageContainer: {
		flex: 1,
	},
})
