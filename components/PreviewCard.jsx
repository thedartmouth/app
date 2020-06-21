import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Queue } from 'react-native-spacing-system';
import { Typography } from '../constants';

export default function PreviewCard(props) { // couldn't get image to display -- probably an issue with Android since no other images are loading for me either
  // so the placeholders right now are just view components
  return (
    <TouchableOpacity>
      <View style={styles.infoBox}>
        {/* <Image
                    source={props.preview.image}
                    style={{ width: 100, height: 100}}
                /> */}
        {/* <View style={styles.temp}></View> */}
        <View style={styles.textBox}>
          <Text style={styles.category}>{props.preview.category}</Text>
          <View style={styles.textBoxAgain}>
            <Text style={styles.title}>{props.preview.content}</Text>
          </View>
        </View>
        <Queue size={10} />
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
    flex: 3,
  },
  title: {
    paddingVertical: 5,
    paddingRight: 5,
    flexWrap: 'wrap',
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
