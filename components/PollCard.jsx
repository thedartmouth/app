import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Divider } from 'react-native-elements'
import { Stack, Queue } from 'react-native-spacing-system'
import { Typography } from '../constants'
import * as uuid from 'uuid'

export default function PollCard(props) {
	return (
		<View style={styles.poll}>
			<Text style={styles.pollQuestion}>{props.poll.question}</Text>
			<Stack size={18} />
			<View>
				{props.poll.answers.map((answer, idx) => (
					<View key={uuid.v4()}>
						<TouchableOpacity
							style={styles.answerArea}
							onPress={() =>
								handleAnswer(
									props.poll.pollID,
									props.userID,
									answer.text
								)
							}
							key={uuid.v4()}
						>
							<Queue size={12} />
							{displayVotes(props.poll.isUnanswered, answer.value)}
							{/* <View style={styles.answerButton} /> */}
							<Queue size={18} />
							<Text style={styles.answerText}>{answer.text}</Text>
						</TouchableOpacity>
						<Stack
							size={idx === props.poll.answers.length - 1 ? 0 : 18}
						/>
					</View>
				))}
			</View>
			<Stack size={18} />
			<Divider style={{ height: 1 }} />
			<Stack size={18} />
			<TouchableOpacity style={styles.refArticleButton}>
				<Text style={{ textDecorationLine: 'underline' }}>
					{' '}
					From: {props.poll.refArticle}
				</Text>
			</TouchableOpacity>
		</View>
	)
}

// when the user votes in poll
function handleAnswer(pollID, userID, choice) {
	const axios = require('axios')
	axios
		.put('http://localhost:9090/polls/', {
			pollID: pollID,
			userID: userID,
			answerChoice: choice,
		})
		.then((response) => console.log(response))

	alert(`You picked:\n${choice}\n`) // tells user their choice
}

function displayVotes(isUnanswered, numVotes) {
	if (!isUnanswered) {
		return <Text>{numVotes}</Text>
	} else {
		return <View style={styles.answerButton} />
	}
}

const styles = StyleSheet.create({
	poll: {
		padding: 24,
		backgroundColor: 'white',
		borderRadius: 24,
		shadowOffset: { height: 3 },
		shadowRadius: 10,
		shadowColor: 'gray',
		shadowOpacity: 0.3,
	},
	pollQuestion: {
		fontSize: 18,
		lineHeight: 28,
	},
	answerArea: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	answerButton: {
		borderWidth: 2,
		borderColor: 'gray',
		alignItems: 'center',
		justifyContent: 'center',
		width: 25,
		height: 25,
		backgroundColor: '#fff',
		borderRadius: 50,
	},
	answerText: {
		flex: 1,
		...Typography.p1,
	},
	refArticleButton: {
		alignSelf: 'center',
	},
})
