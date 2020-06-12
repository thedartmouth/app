import * as React from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, Image } from 'react-native';
import { Divider } from 'react-native-elements';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import { Stack, Queue } from "react-native-spacing-system";
import { Typography, Colors } from '../constants';

export default function ArticleScreen() {
  return (
    <SafeAreaConsumer>
      {insets => (
          <View style={[styles.articleScreen, {paddingTop: 1.5*insets.top}]}>
            <Ionicons name="ios-arrow-back" size={24} color="black" />
            <Stack size={12}></Stack>
            <Text style={styles.category}>Sports</Text>
            <Stack size={12}></Stack>
            <Text style={styles.articleTitle}>Sample Article Title</Text>
            <Stack size={12}></Stack>
            <View style={styles.authorCountArea}>
                <View style={styles.authorArea}>
                    <Text style={styles.author}>by Ziray Hao</Text>
                    <Queue size={8}></Queue>
                    <Ionicons style={styles.authorAdd} name="ios-add" size={16} color="gray" />
                </View>
                <Text style={styles.count}># view cnt.</Text>
            </View>
            <Stack size={12}></Stack>
            <Image
                source={require('../assets/images/article2.jpg')}
                style={styles.articleImage}
            />
            <Stack size={12}></Stack>
            <Text style={styles.abstract}>Dartmouth will apply for the first half of its alloted
            funding from the Coronavirus Aid, Relief, and Economic Security Act, College President
            Phil Hanlon announced today. As required by the federal government, the funding will
            be used for emergency financial aid.</Text>
          </View>
      )}
    </SafeAreaConsumer>

  );
}

const styles = StyleSheet.create({
  articleScreen: {
    flex: 1,
    paddingVertical: 36,
    paddingHorizontal: 36,
    backgroundColor: 'white',
    alignItems: 'stretch',
  },
  intro: {
    alignItems: 'flex-start',
  },
  articleTitle: {
    ...Typography.h2,
    ...Typography.serif,
  },
  category: {
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
  authorCountArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  authorArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  count: {
    ...Typography.sans,
  },
  author: {
    color: 'grey',
    ...Typography.p,
    ...Typography.sans,
  },
  authorAdd: {
    marginTop: 2, // correction
  },
  articleImage: {
    width: '100%',
    maxHeight: 200,
    resizeMode: 'cover',
  },
  abstract: {
    textAlign: 'justify',
    ...Typography.p,
    ...Typography.serif,
  },
});
