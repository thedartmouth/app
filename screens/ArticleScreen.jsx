/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import {
  StyleSheet, Text, View, Image, Animated, Dimensions, Share, TouchableOpacity
} from 'react-native';
import FullWidthImage from 'react-native-fullwidth-image'
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import HTML from 'react-native-render-html';
import { Linking } from 'expo';
import { connect } from 'react-redux';
import { Typography, Colors } from '../constants';
import { Box, Stack, Queue } from '../components/layout';
import { actions } from '../store';
import { utils } from '../lib';

const HORIZONTAL_PADDING = 36;

function ArticleScreen(props) {
  const { article } = props.route.params;
  console.log(article)
  const {
    readArticle, navigation, bookmarkArticle, unbookmarkArticle, bookmarkedArticles,
  } = props;
  const [articleID, setArticleID] = React.useState('');
  const [articleViews, setArticleViews] = React.useState(0);

  // on initial render, read the article, set the ID and views
  React.useEffect(() => {
    readArticle({ article }).then((response) => {
      if (!articleID && !articleViews) {
        setArticleID(response._id);
        setArticleViews(response.views);
      }
    });
  }, []);

  const onShare = async () => {
    try {
      const result = await Share.share({
        url:
          `https://www.thedartmouth.com/article/${article.slug}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // animation
  const scrollY = new Animated.Value(0);
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
            <Box dir="column" style={styles.topTab} pad={[insets.top, 0, 0, 0]}>
              <Box dir="row">
                <Queue size={HORIZONTAL_PADDING} />
                <Animated.View style={{ opacity: opacityButton }}>
                  <Ionicons name="ios-arrow-back" size={36} color={Colors.charcoal} onPress={() => navigation.goBack()} />
                </Animated.View>
              </Box>
              <Stack size={12} />
            </Box>
          </Animated.View>
          <ScrollView
            onScroll={(e) => { scrollY.setValue(e.nativeEvent.contentOffset.y); }}
            scrollEventThrottle={16}
            bounces={false}
          >
            <Stack size={insets.top + 72} />
            <View style={[styles.tags, styles.padded]}>
              {article.tags.map((tag) => (
                <View key={tag} style={styles.tagContainer}>
                  <Text style={styles.tag}>{tag}</Text>
                  <Queue size={8} />
                  <Stack size={32} />
                </View>
              ))}
            </View>
            <Stack size={4} />
            <Text style={[styles.articleTitle, styles.padded]}>{article.headline}</Text>
            <Stack size={12} />
            <View style={[styles.authorViewsArea, styles.padded]}>
              <View style={styles.authorArea}>
                {article.authors.map((author, idx) => (
                  <TouchableOpacity key={idx} navigation={props.navigation} onPress={() => { props.navigation.push('Author', { name: author.name }); }}>
                    <Box dir='row' align='center'>
                    <Text style={styles.author}>
                      {author.name}
                    </Text>
                    <Queue size={4} />
                    <Ionicons style={styles.authorAdd} name="ios-add" size={18} color="gray" />
                    {idx < article.authors.length - 1 ? <Queue size={8}></Queue> : null}
                    </Box>
                  </TouchableOpacity>
                )) || <Text style={styles.author}>
                No authorship
              </Text>}
              </View>
              <Text style={styles.views}>
                {articleViews}
                {' '}
                {articleViews === 1 ? 'view' : 'views'}
              </Text>
            </View>
            <Stack size={12} />
            <FullWidthImage
              source={{ uri: article.imageURI }}
            />
            <Stack size={12} />
            <View style={styles.padded}>
            {article.body ? (
              <HTML
                tagsStyles={{ p: styles.content, a: styles.links }}
                html={article.body}
                onLinkPress={(event, href) => {
                  Linking.openURL(href);
                }}
                imagesMaxWidth={Dimensions.get('window').width - (HORIZONTAL_PADDING * 2)}
              />
            ) : null}
            </View>
            <View>
              <Stack size={144}></Stack>
            </View>
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
                {bookmarkedArticles.includes(articleID)
                  ? <MaterialIcons name="bookmark" size={35} color="gray" onPress={() => unbookmarkArticle('5f08d289904d6614d951a501', articleID, bookmarkedArticles)} />
                  : <MaterialIcons name="bookmark-border" size={35} color="gray" onPress={() => bookmarkArticle('5f08d289904d6614d951a501', articleID, bookmarkedArticles)} />}
                <Ionicons name="ios-share" size={35} color="gray" onPress={onShare} />
              </View>
            </View>
          </Animated.View>
        </View>
      )}
    </SafeAreaConsumer>
  );
}

function mapStateToProps(reduxState) {
  return {
    bookmarkedArticles: reduxState.articles.bookmarkedArticles,
  };
}

export default connect(mapStateToProps,
  {
    readArticle: actions.readArticle,
    bookmarkArticle: actions.bookmarkArticle,
    unbookmarkArticle: actions.unbookmarkArticle,
  })(ArticleScreen);

const styles = StyleSheet.create({
  screen: {
    backgroundColor: Colors.paper,
    flex: 1,
  },
  padded: {
    paddingHorizontal: HORIZONTAL_PADDING,
  },
  topTab: {
    zIndex: 1,
    // alignItems: 'center',
    borderColor: Colors.border,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    // borderWidth: 1,
    position: 'absolute',
    top: 0,
    width: '100%',
    backgroundColor: Colors.paper,
    // borderColor: '#e5e6e9',
    // backgroundColor: 'white',
    // shadowOffset: { height: 3 },
    // shadowRadius: 10,
    // shadowColor: 'gray',
    // shadowOpacity: 0.3,
  },
  intro: {
    alignItems: 'flex-start',
  },
  articleTitle: {
    ...Typography.h2,
    ...Typography.serifBold,
  },
  tagContainer: {
    flexDirection: 'row',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
  authorViewsArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    // flexWrap: 'wrap',
  },
  authorArea: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  views: {
    ...Typography.sans,
  },

  author: {
    color: Colors.charcoal,
    ...Typography.p,
    ...Typography.sans,
  },
  authorAdd: {
    marginTop: 3, // correction
  },
  content: {
    ...Typography.p,
    ...Typography.serifRegular,
    color: Colors.pencil,
    lineHeight: Typography.p.fontSize * 1.7,
    marginBottom: 18,
  },
  links: {
    ...Typography.p,
    ...Typography.serifRegular,
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