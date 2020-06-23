import React from 'react';
import {
  StyleSheet, Text, View, Image, Animated,
} from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { Box, Stack, Queue } from '../components/layout';
import { Typography, Colors } from '../constants';
import HTML from 'react-native-render-html';
import { Linking } from 'expo';

export default function ArticleScreen({ route, navigation }) {
  const scrollY = new Animated.Value(0);
  const { article } = route.params;
  const authorString = article.authors.map((e) => { return e.name }).join(", ");
  const translateYTop = (step) => Animated.diffClamp(scrollY, 0, step).interpolate({
    inputRange: [0, step],
    outputRange: [0, -step],
  });
  const translateYBottom = Animated.diffClamp(scrollY, 0, 20).interpolate({
    inputRange: [0, 20],
    outputRange: [0, 80],
  });
  const opacityButton = Animated.diffClamp(scrollY, 0, 40).interpolate({
    inputRange: [0, 40],
    outputRange: [1, 0],
  });

  return (
    <SafeAreaConsumer>
      {(insets) => (
        <View style={styles.screen}>
          <Animated.View style={{
            transform: [
              { translateY: translateYTop(insets.top) },
            ],
            zIndex: 1,
          }}
          >
            <Box dir="col" style={styles.topTab} pad={[insets.top, 0, 0, 0]}>
              <Box dir="row">
                <Queue size={30} />
                <Animated.View style={{ opacity: opacityButton }}>
                  <Ionicons name="ios-arrow-back" size={30} color="black" onPress={navigation.goBack} />
                </Animated.View>
              </Box>
              <Stack size={10} />
            </Box>
          </Animated.View>
          <ScrollView
            onScroll={(e) => { scrollY.setValue(e.nativeEvent.contentOffset.y); }}
            scrollEventThrottle={16}
            bounces={false}
            style={styles.articleScroll}
          >
            <Stack size={120} />
            <Stack size={12} />
            <Text style={styles.category}>{article.tags[0].name}</Text>
            <Stack size={12} />
            <Text style={styles.articleTitle}>{article.headline}</Text>
            <Stack size={12} />
            <View style={styles.authorCountArea}>
              <View style={styles.authorArea}>
                <Text style={styles.author}>by {authorString}</Text>
                <Queue size={8} />
                <Ionicons style={styles.authorAdd} name="ios-add" size={16} color="gray" />
              </View>
              <Text style={styles.count}># view cnt.</Text>
            </View>
            <Stack size={12} />
            <Image
              source={require('../assets/images/article2.jpg')}
              style={styles.articleImage}
            />
            <Stack size={12} />
            <HTML
              tagsStyles={{ p: styles.content, a: styles.links}}  // heads up, styles do not trigger autorefresh on expo
              html={article.content}
              onLinkPress={(event, href)=>{
                Linking.openURL(href);
              }}
            />
          </ScrollView>
          <Animated.View style={{
            transform: [
              { translateY: translateYBottom },
            ],
            zIndex: 1,
          }}
          >
            <View style={styles.bottomTab}>
              <Stack size={10} />
              <View style={styles.bottomTabButtons}>
                <FontAwesome5 name="praying-hands" size={25} color="gray" />
                <FontAwesome5 name="bookmark" size={25} color="gray" />
                <Ionicons name="ios-share" size={35} color="gray" />
              </View>
            </View>
          </Animated.View>
        </View>
      )}
    </SafeAreaConsumer>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
    flex: 1,
  },
  articleScroll: {
    paddingHorizontal: 30,
  },
  topTab: {
    zIndex: 1,
    borderWidth: 1,
    position: 'absolute',
    top: 0,
    width: '100%',
    borderColor: '#e5e6e9',
    backgroundColor: 'white',
    shadowOffset: { height: 3 },
    shadowRadius: 10,
    shadowColor: 'gray',
    shadowOpacity: 0.3,
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
  content: {
    textAlign: 'left',
    ...Typography.p,
    ...Typography.serif,
    marginBottom: 18,
  },
  links: {
    ...Typography.p,
    ...Typography.serif,
  },
  bottomTab: {
    borderWidth: 1,
    borderColor: '#e5e6e9',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 1,
    backgroundColor: 'white',
    height: 80,
  },
  bottomTabButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
