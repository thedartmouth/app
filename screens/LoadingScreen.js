import * as React from 'react';
import {connect} from 'react-redux';
import {actions} from '../store';
import { Animated, Button, Image, Platform, StyleSheet, Text, TouchableOpacity, View, flex, requireNativeComponent } from 'react-native';
import {Stack} from 'react-native-spacing-system';
import { Typography, Colors } from '../constants';


class LoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.opacity = new Animated.Value(0);
  }

  componentDidMount() {
    this.props.getUser("5eeaedc31ba9cb48805ded95");
    this.props.refreshFeed().then(() => {
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
	{refreshFeed: actions.refreshFeed, getUser: actions.getUser}
	)(LoadingScreen);

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.paper,
    justifyContent: 'center',
    alignItems: 'center',
  },
    banner: {
      height: 30,
      resizeMode: 'contain',
    },
    date: {
      ...Typography.serifRegular,
      ...Typography.p,
      color: Colors.charcoal,
    }
});
