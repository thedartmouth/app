import * as React from 'react';
import { connect } from 'react-redux';
import {
  Image,
  RefreshControl,
  StyleSheet,
  View,
} from 'react-native';
import { Divider } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Stack } from 'react-native-spacing-system';
import { useSafeArea } from 'react-native-safe-area-context';
import ArticleCard from '../components/ArticleCard';
import { actions } from '../store';

const FeedScreen = (props) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    props.refreshFeed('news').then(() => setRefreshing(false));
  }, [refreshing]);

  return (
    <View style={[styles.screen]}>
      <View style={[styles.bannerContainer, { paddingTop: useSafeArea().top }]}>
        <Stack size={20} />
        <Image
          source={require('../assets/images/banner.png')}
          style={styles.banner}
        />
        <Stack size={20} />
      </View>
      {/* <View style={styles.topicBar}>
  <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} bounces={false}>
    {topicBarItems.map((item) => {
      return (
        <View key={item} style={styles.topicBarItem}>
          <Text>{item}</Text>
        </View>
      );
    })}
  </ScrollView>
</View> */}
      <ScrollView
        style={styles.articleBox}
        vertical
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
}
      >
        <Stack size={18} />
        {props.articles.feed.map((article) => (
          <View key={article.ceo_id}>
            <Stack size={24} />
            <ArticleCard article={article} navigation={props.navigation} />
            <Stack size={24} />
            <Divider />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

FeedScreen.navigationOptions = {
  header: null,
};

export default connect(
  (reduxState) => ({
    loading: reduxState.loading, error: reduxState.error, articles: reduxState.articles,
  }),
  { refreshFeed: actions.refreshFeed },
)(FeedScreen);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
  },
  bannerContainer: {
    backgroundColor: 'white',
    zIndex: 1,
    alignItems: 'center',
    shadowOffset: { height: 3 },
    shadowRadius: 10,
    shadowColor: 'gray',
    shadowOpacity: 0.3,
  },
  banner: {
    height: 30,
    resizeMode: 'contain',
  },
  topicBar: {
    height: 35,
  },
  topicBarItem: {
    height: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'solid',
    borderColor: '#BDBDBD',
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingHorizontal: 15,
  },
  articleBox: {
    flex: 1,
    paddingHorizontal: 36,
  },
});
