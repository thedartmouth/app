import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FullWidthImage from 'react-native-fullwidth-image'
import { Stack, Queue } from 'react-native-spacing-system';
import HTML from 'react-native-render-html';
import { connect } from 'react-redux';
import { Colors, Typography } from '../constants';
import { readArticle } from '../store/actions/article-actions';

function ArticleCard(props) {
  const { navigation } = props;

  return (
    <TouchableOpacity
      onPress={() => {
        props.readArticle({ article: props.article });

        navigation.push('Article', {
          article: props.article,
        });
      }}
    >
      <View>
      <FullWidthImage
        source={{ uri: article.imageURI }}
      />
        <Stack size={12} />
        <View style={[styles.tags, styles.padded]}>
          {props.article.tags.map((tag) => (
            <View key={tag} style={styles.tagContainer}>
              <Text style={styles.tag}>{tag}</Text>
              <Queue size={8} />
              <Stack size={32}></Stack>
            </View>
          ))}
        </View>
      <Stack size={4} />
      <Text style={[styles.headline, styles.padded]}>{props.article.headline}</Text>
      <Stack size={12} />
      <View style={styles.padded}>

        <HTML
        tagsStyles={{ p: styles.abstract, a: styles.links }}
        html={props.article.abstract}
        ignoredTags={['u']}
        ></HTML>
      </View>
      <Stack size={12} />
      <View style={[styles.authors, styles.padded]}>
        <Text style={styles.author}>
          By
          {' '}
          {props.article.authors.map((author) => author.name).join(', ')}
        </Text>
      </View>
      </View>
    </TouchableOpacity>
  );
}

export default connect(null, { readArticle })(ArticleCard);

const styles = StyleSheet.create({
  padded: {
    paddingHorizontal: 24,
  },
  tag: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 12,
    lineHeight: 0,
    ...Typography.sansBold,
    color: Colors.paper,
    backgroundColor: Colors.green,
    overflow: 'hidden', // needed to show the borderRadius with backgroundColor
    textTransform: 'uppercase',
  },
  tagContainer: {
    flexDirection: 'row',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  headline: {
    ...Typography.h3,
    ...Typography.serifBold,
  },
  authors: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  author: {
    ...Typography.p,
    ...Typography.sansBold,
    color: Colors.pencil,
  },
  authorAdd: {
    marginTop: 2,
  },
  abstract: {
    ...Typography.p,
    ...Typography.serifRegular,
    lineHeight: Typography.p.fontSize * 1.5,
    color: Colors.pencil,
  },
  links: {
    ...Typography.p,
    ...Typography.serifRegular,
  },
});
