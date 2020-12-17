import * as React from 'react';
import { connect } from 'react-redux';
import { actions } from '../store';
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  StyleSheet,
  View,
  FlatList,
} from 'react-native';
import { Divider } from 'react-native-elements';
import { Stack } from 'react-native-spacing-system';
import { useSafeArea } from 'react-native-safe-area-context';
import ArticleCard from '../components/ArticleCard';
import { Colors } from '../constants';

const FeedScreen = (props) => {
  const [page, setPage] = React.useState(1);

  const onRefresh = React.useCallback(() => {
    props.refreshFeed();
    setPage(1);
  }, []);

  React.useEffect(() => {
    if (page !== 1) props.addFeed(page); // if not refreshing page, add to the feed
  }, [page]);

  return (
    <View style={[styles.screen]}>
      <View style={[styles.bannerContainer, { paddingTop: 0 }]}>
        <Stack size={useSafeArea().top > 0 ? 4 : 16} />
        <Image
          source={require('../assets/images/banner.png')}
          style={styles.banner}
        />
        <Stack size={16} />
      </View>
      <FlatList
        style={styles.articleBox}
        data={props.articles.feed}
        refreshControl={<RefreshControl refreshing={props.articles.feed == null} onRefresh={onRefresh} />}
        onEndReached={() => {
          console.log('end')
          setPage(page + 1)
        }} // set page to adding
        ItemSeparatorComponent={Divider}
        ListFooterComponent={props.articles.feed == null ?(
          <View>
            <Divider />
            <Stack size={36} />
            <ActivityIndicator animating size="large" />
          </View>
        ): null}
        renderItem={({ item }) => (
          <View key={item.slug}>
            <ArticleCard article={item} navigation={props.navigation} />
            <Stack size={36} />
          </View>
        )}
      />
    </View>
  );
};

// FeedScreen.navigationOptions = {
//   header: null,
// };

export default connect(
  (reduxState) => ({
    articles: reduxState.articles,
  }),
  (dispatch) => ({ refreshFeed: actions.refreshFeed(dispatch), addFeed: actions.addFeed(dispatch) }),
)(FeedScreen);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.paper,
  },
  bannerContainer: {
    backgroundColor: Colors.paper,
    zIndex: 1,
    alignItems: 'center',
    borderColor: Colors.border,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    // shadowOffset: { height: 3 },
    // shadowRadius: 10,
    // shadowColor: 'gray',
    // shadowOpacity: 0.3,
  },
  banner: {
    height: 18,
    resizeMode: 'contain',
  },
  // topicBar: {
  //   height: 35,
  // },
  // topicBarItem: {
  //   height: 35,
  //   backgroundColor: 'white',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   borderStyle: 'solid',
  //   borderColor: '#BDBDBD',
  //   borderLeftWidth: 0.5,
  //   borderRightWidth: 0.5,
  //   borderTopWidth: 1,
  //   borderBottomWidth: 1,
  //   paddingHorizontal: 15,
  // },
  articleBox: {
    flex: 1,
  },
});
