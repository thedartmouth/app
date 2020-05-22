import * as React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { Divider } from 'react-native-elements';
import { ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

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
        question: 'Poll question',
        answers: [
          {text: 'answer 1 answer 1 answer 1 answer 1'},
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
              <View style={styles.questionBox}>
                <Text style={styles.pollQuestion}>{poll.question}</Text>
              </View>
              <View>
                {poll.answers.map(answer => {
                  return (
                      <TouchableOpacity onPress={() => handleAnswer(answer.text, poll._id)} key={answer.text}> 
                        <View style={styles.answerBox}>
                          <View style={styles.answerButton}></View>
                          <Text style={styles.answerText}>{answer.text} </Text>
                        </View>
                      </TouchableOpacity>
                )})}
              </View>
              <Divider style={{height: 3 }}/>
              <Text>referencing article</Text>
            </View>
          )
        })}
      </ScrollView>
    )
  }
}

function handleAnswer(choice, question) {
  alert("you picked " + choice + " from question " + question)
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
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    margin: 15,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#f7f7f7', 
  },
  questionBox: {
    display: 'flex',
    padding: 10,
    backgroundColor: "#AEAEAE"
  },
  pollQuestion: {
    fontSize: 25,
    color: '#FFFFFF'
  },
  answerBox: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 5
  },
  answerButton: {
    borderWidth: 2,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width: 25,
    height: 25,
    backgroundColor:'#fff',
    borderRadius: 50,
    margin: 10
  },
  answerText: {
    paddingHorizontal: 5,
    color: '#000000',
    backgroundColor: "#c2c2c2",
    justifyContent: 'center',
    textAlignVertical: 'center'
  }
});

export default PollsScreen;