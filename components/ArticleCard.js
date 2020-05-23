import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ArticleCard(props) {
  return (
    <TouchableOpacity>
      <View style={styles.articleContent}>
        <View style={styles.articleInfo}>
          <Text style={styles.articleCategory}>{props.article.category}</Text>
          <Text style={styles.articleTitle}>{props.article.title}</Text>
          <Text style={styles.articleAuthor}>by {props.article.author}</Text>
        </View>
        <View style={styles.imageBox}>
          <Image
            source={require(props.article.imageURL)}
            style={styles.articleImage}
          />
        </View>
        <Text>{props.article.articleTextBrief}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
  imageBox: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  articleImage: {
    width: 350,
    height: 200,
    resizeMode: 'contain',
  },
});