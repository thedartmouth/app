import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

class PollsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: []
    }
  }

  componentDidMount = () => {
    const polls = []
    for (let i = 0; i < 10; i += 1) {
      const poll = {
        question: 'poll title',
        answers: [
          {text: 'answer'},
          {text: 'answer'},
          {text: 'answer'},
          {text: 'answer'}
        ]
      }
      polls.push(JSON.parse(JSON.stringify(poll)))
    }
    this.setState({polls: polls})
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.polls.map(poll => {
          return (
            <View style={styles.poll}>
              <Text style={styles.pollQuestion}>{poll.question}</Text>
              <View>
                {poll.answers.map(answer => {
                  return (<Text>{answer.text}</Text>)
                })}
              </View>
            <Divider />
          </View>
          )
        })}
        <View></View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#fafafa',
  },
  poll: {
    display: 'flex',
    paddingTop: 15,
    marginBottom: 15,
  },
  pollQuestion: {
    fontSize: 30,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});

export default PollsScreen;