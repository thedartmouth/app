import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Divider } from 'react-native-elements';
import { ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import { SafeAreaConsumer } from 'react-native-safe-area-context';

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
          {text: 'Somewhat responsive'},
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
          <View style={[styles.pollsScreen, {marginTop: insets.top}]}>
            <ScrollView>
              <View style={styles.titleContainer}>
                <Text>
                  Polls
                </Text>
              </View>
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
                                <Text style={styles.answerText}>{answer.text}</Text>
                              </View>
                            </TouchableOpacity>
                      )})}
                    </View>
                    <Divider style={{height: 3 }}/>
                    {/* <Text style={{marginTop: 10}}> From article</Text> */}
                    <View style={styles.refArticleButton}>
                      <Text style={{ textDecorationLine: 'underline' }}> From: {poll.refArticle}</Text>
                    </View>
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

function handleAnswer(choice, question) {
  //alert("you picked " + choice + " from question " + question)
}

const styles = StyleSheet.create({
	pollsScreen: {
		flex: 1,
		backgroundColor: 'white',
	},
  titleContainer: {
    alignItems: 'center',
    padding: 10,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.3,
  },
  titleImage: {},
  poll: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    padding: 15,
    margin: 15,
    borderWidth: 2,
    borderColor: '#d9d9d9'
  },
  questionBox: {
    display: 'flex',
    padding: 10
  },
  pollQuestion: {
    fontSize: 20,
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
    textAlignVertical: 'center',
    fontSize: 15,
    paddingHorizontal: 5,
  },
  refArticleButton: {
    marginTop: 5,
    alignSelf: 'center',
    padding: 10,
  }
});

export default PollsScreen;