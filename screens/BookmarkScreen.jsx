import * as React from 'react';
import {
  StyleSheet, View, FlatList, Text,
} from 'react-native';
import { Divider } from 'react-native-elements';
import { Stack } from 'react-native-spacing-system';
import { MaterialIcons } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { CMS_URL } from '../constants';
import ArticleCard from '../components/ArticleCard';

const axios = require('axios');

class BookmarkScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarks: [],
    };
  }

  componentDidMount() {
    this.setState(
      {
        isLoading: true,
        bookmarks: null,
      },
      this.fetchBookmarksBySlug,
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.bookmarkedArticles !== this.props.bookmarkedArticles) {
      this.setState(
        {
          isLoading: true,
        },
        this.fetchBookmarksBySlug,
      );
    }
  }

  fetchBookmarksBySlug() {
    const { bookmarkedArticles } = this.props;
    let fetchedArticles = [];
    if (bookmarkedArticles.length > 0) {
      bookmarkedArticles.forEach((slug) => {
        fetchedArticles.push(axios.get(`${CMS_URL}/article/${slug}.json`));
      });

      Promise.all(fetchedArticles).then((results) => {
        fetchedArticles = results.map((response) => response.data.article);
        this.setState({
          isLoading: false,
          bookmarks: fetchedArticles,
        });
      });
    }
  }

  render() {
    const { bookmarks, isLoading } = this.state;
    return (
      <View style={styles.bookmarkScreen}>
        {isLoading || bookmarks === null ? (
          <View style={styles.noBookmarks}>
            <MaterialIcons name="bookmark-border" size={35} color="gray" />
            <Text style={styles.noBookmarksTitle}>No articles bookmarked</Text>
            <Text style={styles.noBookmarksSubtitle}>
              Tap on the bookmark icon at the bottom of an article to add to
              your bookmarks
            </Text>
          </View>
        ) : (
          <FlatList
            style={styles.bookmarkBox}
            data={bookmarks}
            ItemSeparatorComponent={Divider}
            renderItem={({ item }) => (
              <View key={item.id}>
                <Stack size={24} />
                <ArticleCard
                  article={item}
                  navigation={this.props.navigation}
                />
                <Stack size={24} />
              </View>
            )}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = (reduxState) => ({
  bookmarkedArticles: reduxState.articles.bookmarkedArticles,
});

export default connect(mapStateToProps)(BookmarkScreen);

const styles = StyleSheet.create({
  bookmarkScreen: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  bookmarkBox: {
    flex: 1,
    paddingHorizontal: 36,
  },

  noBookmarks: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 250,
  },

  noBookmarksTitle: {
    lineHeight: 15,
    textAlign: 'center',
    color: 'gray',
  },

  noBookmarksSubtitle: {
    lineHeight: 20,
    textAlign: 'center',
    color: 'gray',
  },
});
