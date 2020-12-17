import * as React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Divider } from 'react-native-elements'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { SafeAreaConsumer } from 'react-native-safe-area-context'
import { Stack, Queue } from 'react-native-spacing-system'
import PollCard from '../components/PollCard'
import { Typography, Colors } from '../constants'
import * as uuid from 'uuid'

class PollsScreen extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			polls: [], // React component state
			pressed: false,
			answerChosen: '',
			userID: '5eec226839d28f457a64c71a',
			// 5eec226839d28f457a64c71a voted in both
			// 5eebf36a6b0688362623ece6 voted in bread but not in sports
			// 5eebebb249096e34b05a4d50 voted in neither
			unanswered: true, // to change between unanswered polls and answered polls toggling
			fetchType: 'fetchUnanswered', // for the URL
			text: 'Go to Answered Polls', // for the button
			headerText: 'What is your opinion?',
		}
	}

	changePollsFunction = () => {
		this.state.unanswered = !this.state.unanswered
		if (this.state.unanswered) {
			this.state.fetchType = 'fetchUnanswered'
			this.state.text = 'Go to Answered Polls'
			this.state.headerText = 'What is your opinion?'
		} else {
			this.state.fetchType = 'fetchAnswered'
			this.state.text = 'Go to Unanswered Polls'
			this.state.headerText = 'Polls you have answered'
		}
		this.componentDidMount()
	}

	/**
	 * This function is called by React when the component begins to mount (render).
	 * Here, we use it to initialize a sample poll.
	 */

	componentDidMount = () => {
		const axios = require('axios')
		const polls = []

		axios
			.get(
				'http://localhost:9090/polls/' +
					this.state.fetchType +
					'/' +
					this.state.userID
			)
			.then((response) => {
				let allPolls = new Array()
				allPolls = response.data
				// iterate through all polls
				for (let i = 0; i < allPolls.length; i++) {
					thisPoll = allPolls[i]
					const allAnswers = Object.keys(thisPoll.answers)
					const allVotes = Object.values(thisPoll.answers)
					answersList = new Array()
					// iterate through list of answer choices and make key/value pair for each choice
					for (var j = 0; j < allAnswers.length; j++) {
						var obj = {}
						obj.text = allAnswers[j]
						obj.value = allVotes[j]
						answersList.push(obj)
					}
					const poll = {
						_id: Math.random(),
						pollID: thisPoll._id,
						question: thisPoll.question,
						answers: answersList,
						refArticle: thisPoll.associatedArticle,
						isUnanswered: this.state.unanswered, // tags poll as whether it is answered or not
					}
					const copyOfPoll = JSON.parse(JSON.stringify(poll))
					polls.push(copyOfPoll) // copies the object so it's not referencing itself
				}
				this.setState({ polls: polls })
			})
	}

	render() {
		return (
			<SafeAreaConsumer>
				{(insets) => (
					<View style={[styles.pollsScreen, { paddingTop: insets.top }]}>
						<ScrollView style={styles.scroll}>
							<View style={styles.titleArea}>
								<Text style={styles.title}>Polls</Text>

								<TouchableOpacity onPress={this.changePollsFunction}>
									<View
										style={{
											backgroundColor: 'green',
											alignItems: 'center',
											justifyContent: 'center',
											borderRadius: 5,
										}}
									>
										<Text style={{ color: 'white' }}>
											{this.state.text}
										</Text>
									</View>
								</TouchableOpacity>

								<Stack size={8}></Stack>
								<Text style={styles.subtitle}>
									{this.state.headerText}
								</Text>
							</View>
							<Stack size={36}></Stack>
							{/* What's this ID thing do again? */}
							{this.state.polls.map((poll, idx) => {
								return (
									<View key={uuid.v4()} style={styles.poll}>
										<PollCard
											poll={poll}
											userID={this.state.userID}
										></PollCard>
										<Stack
											size={
												idx === this.state.polls.length - 1 ? 0 : 36
											}
										></Stack>
									</View>
								)
							})}
						</ScrollView>
					</View>
				)}
			</SafeAreaConsumer>
		)
	}
}

const styles = StyleSheet.create({
	pollsScreen: {
		flex: 1,
		backgroundColor: 'white',
	},
	scroll: {
		padding: 36,
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

export default PollsScreen
