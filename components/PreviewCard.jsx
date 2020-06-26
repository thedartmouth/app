import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Queue } from 'react-native-spacing-system';
import { Typography } from '../constants';

export default function PreviewCard(props) { // couldn't get image to display -- probably an issue with Android since no other images are loading for me either
  // so the placeholders right now are just view components
  return (
    <TouchableOpacity onPress={() => props.navigation.push('Article')}>
      <View style={styles.infoBox}>
        <View style={styles.textBox}>
          <Text style={styles.category}>{props.preview.category}</Text>
          <View style={styles.textBoxAgain}>
            <Text style={styles.title}>{props.preview.content}</Text>
          </View>
        </View>
        <Queue size={10} />
        {/* <Image
          source={props.preview.image}
          style={{ flex: 1, width: '100%', maxHeight: 65 }} // this is not a great way to handle image dimensions
        /> */}
        <View style={styles.temp} />
      </View>
    </TouchableOpacity>
  );
}

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
