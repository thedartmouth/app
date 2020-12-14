import * as React from 'react';
import {connect} from 'react-redux';
import { ActivityIndicator, StyleSheet, Text, View, FlatList, RefreshControl, } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { Divider } from 'react-native-elements';
import { ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import {Stack, Queue} from 'react-native-spacing-system';
import { Typography, Colors } from '../constants';
import dateFormat from 'dateformat';
import { debounce } from 'debounce';
import axios from 'axios';
import { actions } from '../store';
import PreviewCard from '../components/PreviewCard';

class DiscoverScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      query: null,
      mode: 'discovering'
    }
  }

  search = (query) => {
    this.setState({page: 1, mode: 'searching'}, () => {
      this.props.searchArticles(query, this.state.page);
    })
  }

  debouncedSearch = debounce(this.search, 200)

  refresh = () => {
    if (this.state.query) {
      this.search(this.state.query)
    }
  }

  /**
   * This function is called by React when the component begins to mount (render).
   * Here, we use it to initialize a sample poll.
   */

  render() {
    return (
      <SafeAreaConsumer>
        {insets => (
          <View style={[styles.pollsScreen, {paddingTop: insets.top}]}>
            <ScrollView style={styles.scroll}>
            <Stack size={24}></Stack>
              <View style={styles.titleArea}>
                <Text style={styles.title}>
                  Discover
                </Text>
                <Stack size={12}></Stack>
                <SearchBar
                  platform='default'
                  lightTheme={true}
                  containerStyle={styles.searchContainer}
                  inputContainerStyle={styles.searchInputContainer}
                  placeholder="Vox quaerere..."
                  onChangeText={(query) => {
                    this.setState({query})
                    this.debouncedSearch(query)
                  }}
                  value={this.state.query}
                />
                {this.state.mode === 'searching' ?
                <View>

                <Stack size={8}></Stack>
                <Text style={styles.hint}>
                  {this.props.articles.totalDiscovered > 0 ?
                  `Here are ${
                    this.props.articles.totalDiscovered === 1000 ?
                    'over 1,000' : `${this.props.articles.totalDiscovered}`
                  }`
                  :
                  'We found no'
                  } results
                </Text>
                <Stack size={8}></Stack>
                </View>
                :
                <Stack size={12}></Stack>
                }
                <FlatList
                  style={styles.articleBox}
                  data={this.props.articles.discovered}
                  refreshControl={<RefreshControl refreshing={this.props.articles.discovered == null} onRefresh={this.refresh} />}
                  onEndReached={() => this.setState(prevState => ({page: prevState.page += 1}))} // set page to adding
                  ItemSeparatorComponent={Divider}
                  ListFooterComponent={this.props.articles.discovered == null ? (
                    <View>
                      <Divider />
                      <Stack size={36} />
                      <ActivityIndicator animating size="large" />
                    </View>
                  ): null}
                  renderItem={({ item }) => (
                    <View key={item.slug}>
                      <Stack size={18} />
                      <PreviewCard article={item} navigation={this.props.navigation} />
                      <Stack size={18} />
                    </View>
                  )}
                />
              </View>
              <Stack size={24}></Stack>
            </ScrollView>
          </View>
        )}
      </SafeAreaConsumer>
    )
  }
}

const styles = StyleSheet.create({
	pollsScreen: {
    flex: 1,
    backgroundColor: Colors.paper,
  },
  scroll: {
    paddingHorizontal: 36,
  },
  titleArea: {
  },
  title: {
    ...Typography.serifBold,
    ...Typography.h1,
  },
  titleImage: {},
  searchContainer: {
    backgroundColor: Colors.paper,
    borderTopWidth: 0, // override default {SearchBar} styling
    borderBottomWidth: 0, // override default {SearchBar} styling
    padding: 0, // override default {SearchBar} styling
  },
  searchInputContainer: {
    backgroundColor: Colors.shade, // override default {SearchBar} styling
    borderRadius: 12,
  },
  searchInput: {
    ...Typography.sansRegular,
    color: Colors.charcoal,
  },
  hint: {
    ...Typography.sansLight,
    fontSize: 10,
  }
});

export default connect(
  (store) => ({
    articles: store.articles
  }),
  (dispatch) => ({
    searchArticles: actions.searchArticles(dispatch)
  })
)(DiscoverScreen);