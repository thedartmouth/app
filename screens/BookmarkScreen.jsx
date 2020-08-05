import * as React from "react";
import {
  StyleSheet,
  FlatList,
} from "react-native";
import { SafeAreaConsumer } from "react-native-safe-area-context";
import PreviewCard from "../components/PreviewCard";
import { connect } from 'react-redux';

class BookmarkScreen extends React.Component {
    constructor(props) {
    super(props);
  }

  componentDidMount(){

  }

   render() {
    const {bookmarkedArticles} = this.props
    console.log(bookmarkedArticles)
    return (
    <SafeAreaConsumer>
      {(insets) => (
        <FlatList
          style={[styles.boomarkScreen, { paddingTop: 2 * insets.top }]}
          data={[
            { key: "Devin", category: "Devin", content: "lorem ispsum" },
            { key: "Dan", category: "Sports", content: "lorem ispsum" },
            { key: "Dominic", category: "Sports", content: "lorem ispsum" },
            { key: "Jackson", category: "Sports", content: "lorem ispsum" },
            { key: "James", category: "Sports", content: "lorem ispsum" },
            { key: "Joel", category: "Sports", content: "lorem ispsum" },
            { key: "John", category: "Sports", content: "lorem ispsum" },
            { key: "Jillian", category: "Sports", content: "lorem ispsum" },
            { key: "Jimmy", category: "Sports", content: "lorem ispsum" },
            { key: "Julie", category: "Sports", content: "lorem ispsum" },
          ]}
          renderItem={({ item }) => (<PreviewCard preview={item}></PreviewCard>)}
        />
      )}
    </SafeAreaConsumer>
  );
  }
}

const mapStateToProps = (reduxState) => {
  return {
    currentArticle: reduxState.articles.current,
    bookmarkedArticles: reduxState.articles.bookmarkedArticles,
  };
}

export default connect(mapStateToProps)(BookmarkScreen);


const styles = StyleSheet.create({
  bookmarkScreen: {
    flex: 1,
    paddingVertical: 36,
    paddingHorizontal: 36,
    backgroundColor: 'white',
    alignItems: "stretch",
  },
});
