import * as React from 'react';
import {connect} from 'react-redux';
import {actions} from '../store';
import { Animated, Button, Image, Platform, StyleSheet, Text, TouchableOpacity, View, flex, requireNativeComponent } from 'react-native';
import {Stack} from 'react-native-spacing-system';
import { Typography } from '../constants';


class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.opacity = new Animated.Value(0);
  }

  componentDidMount() {
    this.props.refreshFeed('news').then(() => {
      setTimeout(() => {
        this.props.completeLoading();
      }, 2000);
    })
  }

  onLoad = () => {
    Animated.timing(this.opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }

  render() {
    return (
      <View style={styles.screen}>
        <Image
            source={require('../assets/images/banner.png')}
            style={styles.banner}
          />
        <Stack size={24}></Stack>
        <Animated.Text
          onLoad={this.onLoad()}
          style={[
            {
              opacity: this.opacity,
              transform: [
                {
                  scale: this.opacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.85, 1],
                  })
                },
              ],
            },
            styles.date
          ]}
        >
          Tuesday, Jan. 5, 2018
        </Animated.Text>
      </View>
    );
  }
}

 

export default connect(
	reduxState => ({
		loading: reduxState.loading, error: reduxState.error, articles: reduxState.articles,
	}),
	{refreshFeed: actions.refreshFeed}
	)(LoadingScreen);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
    banner: {
      height: 30,
      resizeMode: 'contain',
    },
    date: {
      ...Typography.serif,
      fontSize: 18,
      color: 'gray',
    }
});
