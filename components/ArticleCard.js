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
import { Stack, Queue } from "react-native-spacing-system";

export default function ArticleCard(props) {
  return (
    <TouchableOpacity>
      <View style={styles.articleContent}>
        <View style={styles.articleInfo}>
          <Text style={styles.articleCategory}>{props.article.category.name}</Text>
          <Stack size={12}></Stack>
          <Text style={styles.articleTitle}>{props.article.headline}</Text>
          <Stack size={12}></Stack>
          <Text style={styles.articleAuthor}>by {props.article.authors[0].name}</Text>
        </View>
        <Stack size={18}></Stack>
        <Image
          source={require('../assets/images/article1.jpg')}
          style={styles.articleImage}
        />
        <Stack size={18}></Stack>
        <Text style={styles.articlePreview}>{props.article.content}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  articleContent: {

  },
  articleCategory: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'grey',
  },
  articleTitle: {
    fontSize: 24,
  },
  articleAuthor: {
    color: 'grey',
  },
  articlePreview: {
    textAlign: 'justify',
  },
  articleImage: {
    width: '100%',
    maxHeight: 200,
    resizeMode: 'contain',
  },
});