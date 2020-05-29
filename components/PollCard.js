import React from 'react';
import {
	Alert,
	Button,
	Image,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Divider } from 'react-native-elements';
import { Stack, Queue } from "react-native-spacing-system";
import { Colors, Typography } from '../constants';

export default function PollCard(props) {
  return (
    <View style={styles.poll}>
      <Text style={styles.pollQuestion}>{props.poll.question}</Text>
      <Stack size={18}></Stack>
      <View>
        {props.poll.answers.map((answer, idx) => {
          return (
            <View>
              <TouchableOpacity  style={styles.answerArea} onPress={() => handleAnswer(answer.text, props.poll.question)} key={answer.text}> 
                <Queue size={12}></Queue>
                <View style={styles.answerButton}></View>
                <Queue size={18}></Queue>
                <Text style={styles.answerText}>{answer.text}</Text>
              </TouchableOpacity>
              <Stack size={idx === (props.poll.answers.length - 1) ? 0 : 18}></Stack>
            </View>
        )})}
      </View>
      <Stack size={18}></Stack>
      <Divider style={{ height: 1 }}/>
      <Stack size={18}></Stack>
      <TouchableOpacity style={styles.refArticleButton}>
        <Text style={{ textDecorationLine: 'underline' }}> From: {props.poll.refArticle}</Text>
      </TouchableOpacity>
    </View>
  );
}

function handleAnswer(choice, question) {
  alert("You picked:\n" + choice + "\nfrom question:\n" + question)
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
    backgroundColor:'#fff',
    borderRadius: 50,
  },
  answerText: {
    flex: 1,
    ...Typography.p1,
  },
  refArticleButton: {
    alignSelf: 'center',
  }
});