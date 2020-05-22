import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

class PollsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      polls: [] // React component state
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
        question: 'poll title',
        answers: [
          {text: 'answer 1'},
          {text: 'answer 2'},
          {text: 'answer 3'},
          {text: 'answer 4'}
        ]
      }
      const copyOfPoll = JSON.parse(JSON.stringify(poll));
      polls.push(copyOfPoll) // copies the object so it's not referencing itself
    }
    this.setState({polls: polls}) // sets this poll into the React component state
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.polls.map(poll => {
          return (
            <View key={poll._id} style={styles.poll}>
              <Text style={styles.pollQuestion}>{poll.question}</Text>
              <View>
                {poll.answers.map(answer => {
                  return (<Text key={answer.text}>{answer.text}</Text>)
                })}
              </View>
              <Divider />
              <Text>referencing article</Text>
            </View>
          )
        })}
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
    flexDirection: 'column',
    paddingTop: 15,
    marginBottom: 15,
  },
  pollQuestion: {
    fontSize: 30,
  },
});

export default PollsScreen;