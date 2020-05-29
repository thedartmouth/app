import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Divider } from 'react-native-elements';
import { ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import {Stack, Queue} from 'react-native-spacing-system';
import PollCard from '../components/PollCard';
import { Typography, Colors } from '../constants';

class PollsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: [], // React component state
      pressed: false,
      answerChosen: ''
    }
  }

  /**
   * This function is called by React when the component begins to mount (render).
   * Here, we use it to initialize a sample poll.
   */
  componentDidMount = () => {
    const polls = []
    for (let i = 0; i < 10; i += 1) {
      const poll = {
        _id: Math.random(),
        question: 'In your opinion, how responsive has the College administration been to student concerns during this time?',
        answers: [
          {text: 'Very unresponsive'},
          {text: 'Somewhat unresponsive'},
          {text: 'Somewhat responsive, but what if this answer was super long because there are just long answers'},
          {text: 'Very responsive'}
        ],
        refArticle: 'Name of referencing article'
      }
      const copyOfPoll = JSON.parse(JSON.stringify(poll));
      polls.push(copyOfPoll) // copies the object so it's not referencing itself
    }
    this.setState({polls: polls}) // sets this poll into the React component state
  }

  render() {
    return (
      <SafeAreaConsumer>
        {insets => (
          <View style={[styles.pollsScreen, {paddingTop: insets.top}]}>
            <ScrollView style={styles.scroll}>
              <View style={styles.titleArea}>
                <Text style={styles.title}>
                  Polls
                </Text>
                <Stack size={8}></Stack>
                <Text style={styles.subtitle}>
                  What's your opinion?
                </Text>
              </View>
              <Stack size={36}></Stack>
              {this.state.polls.map((poll, idx) => {
                return (
                  <View key={poll._id} style={styles.poll}>
                    <PollCard poll={poll}></PollCard>
                    <Stack size={(idx === this.state.polls.length - 1) ? 0 : 36}></Stack>
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
  titleArea: {
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
  },
  subtitle: {
    ...Typography.h3,
  },
  titleImage: {},
});

export default PollsScreen;