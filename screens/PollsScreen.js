import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Divider } from 'react-native-elements';
import { ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import {Stack, Queue} from 'react-native-spacing-system';
import PollCard from '../components/PollCard';
import { Typography, Colors } from '../constants';
import axios from 'axios';

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
    const axios = require('axios');
    const polls = []; 
    // gets poll from backend 
    axios.get("http://localhost:9090/polls/").then(response => {
      let allPolls = new Array(); 
      allPolls = response.data; 
      // iterate through all polls 
      for (let i = 0; i < allPolls.length; i++) {
        thisPoll = allPolls[i];
        const allAnswers = Object.keys(thisPoll.answers); 
        answersList = new Array(); 
       // iterate through list of answer choices and make key/value pair for each choice
        for (var j = 0; j < allAnswers.length; j++) {
          var obj = {}
          obj.text = allAnswers[j];
          answersList.push(obj);
        }
        const poll = {
        _id: Math.random(), 
        question: thisPoll.question, 
        answers: answersList, 
        refArticle: thisPoll.associatedArticle
        }
        const copyOfPoll = JSON.parse(JSON.stringify(poll));
        polls.push(copyOfPoll) // copies the object so it's not referencing itself
    }
    this.setState({polls: polls});
    })

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
              {/* What's this ID thing do again? */}
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