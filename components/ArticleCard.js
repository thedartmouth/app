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
import { Ionicons } from '@expo/vector-icons'; 
import { Stack, Queue } from "react-native-spacing-system";
import { Colors, Typography, CMSImageUrl } from '../constants';

export default function ArticleCard(props) {
  console.log('imageURI', CMSImageUrl(props.article.dominantMedia.attachment_uuid, props.article.dominantMedia.preview_extension));
  return (
    <TouchableOpacity>
      <View style={styles.articleContent}>
        <View style={styles.articleInfo}>
          <Text style={styles.articleCategory}>{props.article.tags[0].name}</Text>
          <Stack size={12}></Stack>
          <Text style={styles.articleTitle}>{props.article.headline}</Text>
          <Stack size={12}></Stack>
          <View style={styles.authorArea}>
            <Text style={styles.author}>by {props.article.authors[0].name}</Text>
            <Queue size={8}></Queue>
            <Ionicons style={styles.authorAdd} name="ios-add" size={16} color="gray" />
          </View>
        </View>
        <Stack size={12}></Stack>
        <Image
          source={{uri: CMSImageUrl(props.article.dominantMedia.attachment_uuid, props.article.dominantMedia.preview_extension)}}
          style={styles.articleImage}
        />
        <Stack size={12}></Stack>
        <Text style={styles.abstract}>{props.article.abstract}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  articleContent: {

  },
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
  },
  articleTitle: {
    ...Typography.h2,
    ...Typography.serif,
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
  articleImage: {
    width: '100%',
    maxHeight: 200,
    resizeMode: 'cover',
  },
});