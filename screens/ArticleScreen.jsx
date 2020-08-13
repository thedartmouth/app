/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import {
  StyleSheet, Text, View, Image, Animated, Dimensions,
} from 'react-native';
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import HTML from 'react-native-render-html';
import { Linking } from 'expo';
import { connect } from 'react-redux';
import { Typography, Colors } from '../constants';
import { Box, Stack, Queue } from '../components/layout';
import { actions } from '../store';

function ArticleScreen(props) {
  const { article } = props.route.params;
  const {
    readArticle, navigation, bookmarkArticle, unbookmarkArticle, bookmarkedArticles,
  } = props;
  const [articleID, setArticleID] = React.useState('');
  const [articleViews, setArticleViews] = React.useState('');

  React.useEffect(() => {
    readArticle({ article }).then((response) => {
      if (!articleID) {
        setArticleID(response._id);
        setArticleViews(response.views);
      }
    });
  }, []);

  function renderHTML() {
    if (article.content) {
      return (
        <HTML
          tagsStyles={{ p: styles.content, a: styles.links }} // heads up, styles do not trigger autorefresh on expo
          html={article.content}
          onLinkPress={(event, href) => {
            Linking.openURL(href);
          }}
          imagesMaxWidth={Dimensions.get('window').width - 60}
        />
      );
    }
    return null;
  }

  const scrollY = new Animated.Value(0);
  const authorString = article.authors.map((e) => e.name).join(', ');
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
                <Queue size={30} />
                <Animated.View style={{ opacity: opacityButton }}>
                  <Ionicons name="ios-arrow-back" size={30} color="black" onPress={() => navigation.goBack()} />
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
            <View style={styles.tagsArea}>
              {article.tags.map((tag) => (
                <View key={tag.name} style={styles.tag}>
                  <Text style={styles.articleCategory}>{tag.name}</Text>
                  <Queue size={8} />
                  <Stack size={32} />
                </View>
              ))}
            </View>
            <Stack size={12} />
            <Text style={styles.articleTitle}>{article.headline}</Text>
            <Stack size={12} />
            <View style={styles.authorViewsArea}>
              <View style={styles.authorArea}>
                {/* <Text style={styles.author}>by {authorString}</Text> */}
                {article.authors.map((author, idx) => (
                  <TouchableOpacity key={idx} navigation={props.navigation} onPress={() => { props.navigation.push('Author', { name: author.name }); }}>
                    <Text style={styles.author}>
                      {author.name}
                      {idx === article.authors.length - 1 ? '' : ', '}
                    </Text>
                  </TouchableOpacity>
                ))}
                <Queue size={8} />
                <Ionicons style={styles.authorAdd} name="ios-add" size={16} color="gray" />
              </View>
              <Text style={styles.views}>
                {articleViews}
                {' '}
                view(s)
              </Text>
            </View>
            <Stack size={12} />
            <Image
              source={require('../assets/images/article2.jpg')}
              style={styles.articleImage}
            />
            <Stack size={12} />
            {renderHTML()}
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
                <Ionicons name="ios-share" size={35} color="gray" />
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
    currentArticle: reduxState.articles.current,
    bookmarkedArticles: reduxState.articles.bookmarkedArticles,
  };
}

export default connect(mapStateToProps,
  {
    readArticle: actions.readArticle,
    // leaveArticle: actions.leaveArticle,
    bookmarkArticle: actions.bookmarkArticle,
    unbookmarkArticle: actions.unbookmarkArticle,
  })(ArticleScreen);

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
  tag: {
    flexDirection: 'row',
  },
  tagsArea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
    textTransform: 'uppercase',
  },
  authorViewsArea: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  authorArea: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    // flex: 3,
  },
  views: {
    ...Typography.sans,
    position: 'absolute',
    right: 0,
    // flex: 1,
  },
  author: {
    color: 'grey',
    ...Typography.p,
    ...Typography.sans,
    // flexWrap: 'wrap',
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
