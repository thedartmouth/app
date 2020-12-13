import * as React from 'react';
import { connect } from 'react-redux';
import { actions } from '../store';
import {
  StyleSheet, Text, View, Switch, TouchableOpacity,
} from 'react-native';
import { Divider } from 'react-native-elements';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import { Stack, Queue } from 'react-native-spacing-system';
import { Typography, Colors } from '../constants';
import BookmarkScreen from './BookmarkScreen';
import ArticleScreen from './ArticleScreen';
import { createStackNavigator } from '@react-navigation/stack';

const ProfileStack = createStackNavigator();

function ProfileScreen(props) {
  return (
    <SafeAreaConsumer>
      {(insets) => (
        <View style={[styles.profileScreen, { paddingTop: insets.top }]}>
          <View style={styles.intro}>
            <Text style={styles.title}>Hello, {props.user.data?.name?.first || 'there'}.</Text>
            <Stack size={24} />
            <View style={styles.reward}>
              <View>
                <SimpleLineIcons name="cup" size={24} color="black" />
                <Text style={styles.coffeeCount}>16</Text>
              </View>
              <Queue size={16} />
              <Text style={styles.rewardText}>coffee cups earned!</Text>
            </View>
          </View>
          <Stack size={24} />
          <Divider style={styles.divider} />
          <Stack size={24} />
          <View style={styles.contentBoxes}>
            <View style={styles.contentBox}>
              <Text style={styles.heading}>Your stuff</Text>
              <Stack size={12} />
              <Divider style={styles.thinDivider} />
              <Stack size={4} />
              <TouchableOpacity style={styles.rowItem} onPress={ () => props.navigation.navigate('Bookmarks')}>
                <Text style={Typography.p}>Bookmarks</Text>
                <Ionicons name="ios-arrow-forward" size={24} style={styles.rowItemIcon} />
              </TouchableOpacity>
              <Stack size={4} />
              <Divider style={styles.thinDivider} />
              <Stack size={4} />
              <TouchableOpacity style={styles.rowItem}>
                <Text style={Typography.p}>Followed authors</Text>
                <Ionicons name="ios-arrow-forward" size={24} style={styles.rowItemIcon} />
              </TouchableOpacity>
              <Stack size={4} />
              <Divider style={styles.thinDivider} />
              <Stack size={4} />
              <TouchableOpacity style={styles.rowItem}>
                <Text style={Typography.p}>Completed polls</Text>
                <Ionicons name="ios-arrow-forward" size={24} style={styles.rowItemIcon} />
              </TouchableOpacity>
              <Stack size={4} />
              <Divider style={styles.thinDivider} />
            </View>
            <Stack size={24} />
            <View style={styles.contentBox}>
              <Text style={styles.heading}>Notification settings</Text>
              <Stack size={12} />
              <View style={styles.rowItem}>
                <Text style={Typography.p}>Trending articles</Text>
                <Switch />
              </View>
              <Stack size={8} />
              <View style={styles.rowItem}>
                <Text style={Typography.p}>Followed tags</Text>
                <Switch />
              </View>
              <Stack size={8} />
              <View style={styles.rowItem}>
                <Text style={Typography.p}>Followed writers</Text>
                <Switch />
              </View>
            </View>
          </View>
        </View>
      )}
    </SafeAreaConsumer>

  );
}

const ConnectedProfileScreen = connect(store => ({
  user: store.user
}),
(dispatch) => ({auth: actions.auth(dispatch), getUser: actions.getUser(dispatch)}))(ProfileScreen);

export function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ConnectedProfileScreen} />
      <ProfileStack.Screen name="Bookmarks" component={BookmarkScreen} />
      <ProfileStack.Screen name="Articles" component={ArticleScreen}/>
    </ProfileStack.Navigator>
  );
}

const styles = StyleSheet.create({
  profileScreen: {
    flex: 1,
    paddingHorizontal: 36,
    backgroundColor: Colors.paper,
    alignItems: 'stretch',
  },
  intro: {
    alignItems: 'center',
  },
  title: {
    ...Typography.h1,
    ...Typography.serifRegular,
  },
  reward: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coffeeCount: {
    marginLeft: 2, // because the coffee icon is slightly imbalanced
    // alignItems: 'center',
    ...Typography.serifRegular,
  },
  rewardText: {
    ...Typography.p,
    ...Typography.serifRegular,
  },
  divider: {
    height: 1,
  },
  contentBoxes: {
  },
  contentBox: {
  },
  heading: {
    ...Typography.h3,
    ...Typography.sansBold,
    color: Colors.pencil,
  },
  rowItem: {
    flex: 0,
    height: 31,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowItemIcon: {
    marginRight: 18,
  },
  thinDivider: {
    height: 0,
  },
});
