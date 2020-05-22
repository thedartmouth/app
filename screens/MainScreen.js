import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Link } from 'react-router-dom';
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
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import Article from '../components/Article';
import { MonoText } from '../components/StyledText';

const renderArticle = (articles) => {
  articles.map();
};

export default function HomeScreen() {
  const topicBarItems = [
    'COVID-19',
    'NEWS',
    'OPINION',
    'SPORTS',
    'ARTS',
    'MIROR',
    'MULTIMEDIA',
  ];

  const article1 = {
    category: 'NEWS',
    title: 'Q&A with CNN correspondent Jake Tapper ’91',
    author: 'Lauren Adler',
    publishDTG: '5/21/20 2:15am',
    viewCount: '1',
    articleImage: '../assets/images/article1.jpg',
    articleTextBrief:
      'Before Jake Tapper ’91 became host of CNN’s “The Lead” and “State of the Union” and one of the nation’s most respected political correspondents, he got his start as a cartoonist for The Dartmouth. In an interview with The Dartmouth, Tapper discussed the COVID-19 pandemic and the current state of journalism in the U.S.',
  };

  const article2 = {
    category: 'NEWS',
    title: 'Q&A with CNN correspondent Jake Tapper ’91',
    author: 'Lauren Adler',
    publishDTG: '5/21/20 2:15am',
    viewCount: '1',
    articleImage: '../assets/images/article1.jpg',
    articleTextBrief:
      'Before Jake Tapper ’91 became host of CNN’s “The Lead” and “State of the Union” and one of the nation’s most respected political correspondents, he got his start as a cartoonist for The Dartmouth. In an interview with The Dartmouth, Tapper discussed the COVID-19 pandemic and the current state of journalism in the U.S.',
  };

  const articles = [article1, article2];

  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Image
          source={require('../assets/images/title.png')}
          style={styles.titleImage}
        />
      </View>
      <View style={styles.topicBar}>
        <ScrollView horizontal={true}>
          {topicBarItems.map((item) => {
            return (
              <View style={styles.topicBarItem}>
                <Text>{item}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.articleBox}>
        <ScrollView style={{ flex: 1 }} vertical={true}>
          {articles.map((article) => {
            return (
              <View style={styles.articleContent}>
                <View style={styles.articleInfo}>
                  <Text style={styles.articleCategory}>{article.category}</Text>
                  <Text style={styles.articleTitle}>{article.title}</Text>
                  <Text style={styles.articleAuthor}>by {article.author}</Text>
                </View>
                <View style={styles.imageBox}>
                  <Image
                    source={require('../assets/images/article1.jpg')}
                    style={styles.articleImage}
                  />
                </View>
                <Text>{article.articleTextBrief}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  titleContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    // flex: 1,
  },
  titleImage: {},
  topicBar: {
    height: 35,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.3,
  },
  topicBarItem: {
    height: 35,
    backgroundColor: 'white',
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: '#BDBDBD',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingHorizontal: 15,
  },
  articleBox: {
    flex: 1,
  },
  articleImage: {
    width: 350,
    height: 200,
    resizeMode: 'contain',
  },
  imageBox: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  articleContent: {
    padding: 30,
    borderStyle: 'solid',
    borderColor: '#BDBDBD',
    borderBottomWidth: 0.5,
  },
  articleCategory: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'grey',
  },
  articleTitle: {
    paddingVertical: 8,
    fontSize: 25,
  },
  articleAuthor: {
    color: 'grey',
  },
});
