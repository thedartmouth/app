import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Queue } from 'react-native-spacing-system';
import { Typography, CMSImageUrl } from '../constants';
import { connect } from 'react-redux';
import { readArticle } from '../store/actions/article-actions';
import axios from 'axios';
import { CMS_URL } from '../constants';


function PreviewCard(props) { 
  return (
    <TouchableOpacity onPress={() => {
      props.readArticle( { article: props.preview.article });

      props.navigation.push('Article', {
        article: props.preview.article,
      })

      // BELOW: OLD CODE THAT MAKES AXIOS REQUEST TO GET ARTICLE
      // axios.get(`${CMS_URL}/article/${props.preview.slug}.json`).then(response => { 
      //   // console.log(response); 
      //   props.readArticle({ article: response.data.article});

      //   props.navigation.push('Article', {
      //     article: response.data.article
      // });
      
      // });

    }}>
      <View style={styles.infoBox}>
        <View style={styles.textBox}>
          <Text style={styles.category}>{props.preview.category}</Text>
          <View style={styles.textBoxAgain}>
            <Text style={styles.title}>{props.preview.headline}</Text>
          </View>
        </View>
        <Queue size={10} />
        <Image
          source={{ uri: CMSImageUrl(props.preview.image, props.preview.imageType) }}
          style={{ flex: 1, width: '50%', maxHeight: 65 }} // this is not a great way to handle image dimensions
        />
      </View>
    </TouchableOpacity>
  );
}

export default connect(null, { readArticle })(PreviewCard);


const styles = StyleSheet.create({
  category: {
    color: '#7A7A7A',
    ...Typography.p,
  },
  infoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textBox: {
    flex: 2.5,
  },
  title: {
    paddingVertical: 5,
    paddingRight: 5,
    // flexWrap: 'wrap',
    ...Typography.p,
  },
  previewImage: {
    width: 50,
    height: 50,
    maxHeight: 50,
    resizeMode: 'cover',
  },
  temp: {
    backgroundColor: '#969696',
    flex: 1,
    height: 65,
  },
});
