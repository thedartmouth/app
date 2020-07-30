import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack, Queue } from 'react-native-spacing-system';
import HTML from 'react-native-render-html';
import { connect } from 'react-redux';
import { Colors, Typography, CMSImageUrl } from '../constants';
import { readArticle } from '../store/actions/article-actions';

function ArticleCard(props) {
  const { navigation } = props;
  const authorString = props.article.authors.map((e) => e.name).join(', ');
  function renderHTML() {
    if (props.article.abstract) {
      return (
        <HTML
          tagsStyles={{ p: styles.abstract, a: styles.links }} // heads up, styles do not trigger autorefresh on expo
          html={props.article.abstract}
          ignoredTags={['u']}
        />
      );
    }
    return null;
  }

  return (
    <TouchableOpacity
      onPress={() => {
        // props.readArticle({ article: props.article });

        navigation.push('Article', {
          article: props.article,
        });
      }}
    >
      <View style={styles.articleInfo}>
        <View style={styles.tagsArea}>
          {props.article.tags.map((tag) => (
            <View key={tag.name} style={styles.tag}>
              <Text style={styles.articleCategory}>{tag.name}</Text>
              <Queue size={8} />
              <Stack size={32} />
            </View>
          ))}
        </View>
        <Stack size={12} />
        <Text style={styles.articleTitle}>{props.article.headline}</Text>
        <Stack size={12} />
        <View style={styles.authorArea}>
          <Text style={styles.author}>
            by
            {' '}
            {authorString}
          </Text>
          <Queue size={8} />
          <Ionicons style={styles.authorAdd} name="ios-add" size={16} color="gray" />
        </View>
      </View>
      <Stack size={12} />
      <Image
        source={{ uri: CMSImageUrl(props.article.dominantMedia.attachment_uuid, props.article.dominantMedia.preview_extension) }}
        style={styles.articleImage}
      />
      <Stack size={12} />
      {renderHTML()}
    </TouchableOpacity>
  );
}

export default connect(null, { readArticle })(ArticleCard);

const styles = StyleSheet.create({
  articleCategory: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: Colors.green,
    overflow: 'hidden', // needed to show the borderRadius with backgroundColor
    textTransform: 'uppercase',
  },
  tag: {
    flexDirection: 'row',
  },
  tagsArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  articleTitle: {
    ...Typography.h2,
    // ...Typography.serif,
    fontFamily: 'libre-regular',
  },
  authorArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  author: {
    color: 'grey',
    ...Typography.p,
    ...Typography.sans,
  },
  authorAdd: {
    marginTop: 2, // correction
  },
  abstract: {
    textAlign: 'justify',
    ...Typography.p,
    ...Typography.serif,
  },
  links: {
    ...Typography.p,
    ...Typography.serif,
  },
  articleImage: {
    width: '100%',
    maxHeight: 200,
    resizeMode: 'cover',
  },
});
