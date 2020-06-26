import * as React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Divider } from 'react-native-elements';
import { ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import {Stack, Queue} from 'react-native-spacing-system';
import { Typography, Colors } from '../constants';
import { Ionicons } from '@expo/vector-icons';
import PreviewCard from '../components/PreviewCard';
import axios from 'axios';

class AuthorScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previews: [], // React component state
      followed: false,
      author: {},
    }
  }

  follow = () => { 
    axios.put("http://192.168.1.9:9090/author/profile/andrew-sasser", this.state.followed)
    this.setState({ followed: !this.state.followed })
  }

  /**
   * This function is called by React when the component begins to mount (render).
   * Here, we use it to initialize sample previews.
   */
  componentDidMount = () => {
    const axios = require('axios');
    
    axios.get("http://192.168.1.9:9090/author/search?AuthorName=andrew s",).then(
      axios.get("http://192.168.1.9:9090/author/profile/andrew-sasser").then(response => { 

        const author = {
          name: response.data.author.name,
          initials: response.data.author.name.split(' ').map(function(word, idx){
            return ((idx == 0) ? ' ' + word[0] + '.' : word[0] + '.')
          }).join(''), 
          readers: response.data.totalViews.toLocaleString(), // known issue, doesn't work on Android. hopefully works on ioS
          followers: response.data.author.followers.length,
          numArticles: response.data.totalArticles,
          bio: '',
        } 

        const previews = []
        for (let i = 0; i < author.numArticles; i+=1) {
          const currPreview = response.data.articles[i]
          let index = 0
          for (let j = 0; j < currPreview.metadata.length; j++) {
            if (currPreview.metadata[j].label == "kicker") {
              index = j
            }
          }
          const preview = {
            articleID: currPreview.id,
            category: currPreview.metadata[index].value.toUpperCase(),
            // image: currPreview.dominantMedia.uuid,
            content: currPreview.headline,
          }
          const copyOfPreview = JSON.parse(JSON.stringify(preview));
          previews.push(copyOfPreview) // copies the object so it's not referencing itself
        }

        this.setState({ previews: previews})
        this.setState({ author: author })

      })
    );
  }

  render() {
    return (
      <SafeAreaConsumer>
        {insets => (
          <View style={[styles.authorScreen, {paddingTop: insets.top}]}>
            <ScrollView style={styles.scroll}>
                <Ionicons name="ios-arrow-back" size={30} color="black" onPress={this.props.navigation.goBack} />
                <Stack size={18}></Stack>
                <View style={styles.authorInfo}>
                    <View style={styles.authorPhoto}>
                      <Text style={styles.initials}>{this.state.author.initials} </Text>
                    </View>
                    <Stack size={18}></Stack>
                    <Text style={styles.authorName}>{this.state.author.name}</Text>
                    <Stack size={10}></Stack>
                    <View style={styles.followers}> 
                        <Text style={styles.followersText}>{this.state.author.readers} readers   |</Text>
                        <Queue size={10}></Queue>
                        <Text style={styles.followersText}>{this.state.author.followers} followers</Text>
                    </View> 
                    {(this.state.author.bio == '') ? <Stack size={0}></Stack> : <Stack size={25}></Stack>} 
                    <Text style={styles.bio}>{this.state.author.bio}</Text>
                    <Stack size={25}></Stack>
                    <TouchableOpacity style={styles.followButton} onPress={this.follow}>
                        {this.state.followed == false ? <Text style={styles.followButtonText}> Follow</Text> : <Text style={styles.followButtonText}> Following</Text>}
                    </TouchableOpacity>
                </View> 
                <Stack size={28}></Stack> 
                <Divider style={ {backgroundColor: '#969696', height: 2,}}/>
                <Stack size={28}></Stack> 
                <Text style={styles.published}>Published {this.state.author.numArticles} articles</Text>
                <Stack size={24}></Stack> 
                {this.state.previews.map((preview, index) => {
                  return (
                    <View key={preview.articleID}>
                      <TouchableOpacity>
                        <PreviewCard preview={preview} navigation={this.props.navigation}></PreviewCard>
                      </TouchableOpacity>
                      <Stack size={(index == this.state.previews.length - 1) ? 0 : 28}></Stack>
                    </View>
                  )
                })}
            </ScrollView>
          </View>
        )}
      </SafeAreaConsumer>
    )
  }
}



const styles = StyleSheet.create({
  scroll: {
      padding: 30,
  },
  authorScreen: {
    flex: 1,
    backgroundColor: 'white',
  },
  authorInfo: {
    alignItems: 'center'
  },
  authorPhoto: {
    justifyContent: 'center',
    width: 100,
    height: 100,
    backgroundColor:'#C4C4C4',
    borderRadius: 50,
    alignItems: 'center',
  },
  authorName: {
    fontWeight: 'bold',
    fontSize: 32,
  },
  initials: {
    ...Typography.h2,
    color: 'white',
  },
  followers: {
    alignItems: 'center',
    flexDirection: 'row'
  },
  followersText: {
  },
  bio: {
    ...Typography.p
  },
  followButton: {
    paddingVertical: 8,
    paddingHorizontal: 30,
    backgroundColor: '#969696',
    borderRadius: 10
  },
  followButtonText: {
    ...Typography.h3,
    color: 'white',
  },
  published: {
    ...Typography.h3
  },
  titleArea: {
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
  },
  subtitle: {
    ...Typography.h3,
  },
  titleImage: {},
});

export default AuthorScreen;