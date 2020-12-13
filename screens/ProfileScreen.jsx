import * as React from 'react';
import {
  StyleSheet, Text, View, Switch, TouchableOpacity,
} from 'react-native';
import { Divider } from 'react-native-elements';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import { Stack, Queue } from 'react-native-spacing-system';
import { Typography } from '../constants';
import BookmarkScreen from './BookmarkScreen';
import ArticleScreen from './ArticleScreen';
import { createStackNavigator } from '@react-navigation/stack';

const ProfileStack = createStackNavigator();

export default function ProfileScreen({navigation}) {
  return (
    <SafeAreaConsumer>
      {(insets) => (
        <View style={[styles.profileScreen, { paddingTop: 2 * insets.top }]}>
          <View style={styles.intro}>
            <Text style={styles.title}>Hello, Jessica.</Text>
            <Stack size={36} />
            <View style={styles.reward}>
              <View>
                <SimpleLineIcons name="cup" size={24} color="black" />
                <Text style={styles.coffeeCount}>16</Text>
              </View>
              <Queue size={18} />
              <Text style={styles.rewardText}>coffee cups earned!</Text>
            </View>
          </View>
          <Stack size={36} />
          <Divider style={styles.divider} />
          <Stack size={36} />
          <View style={styles.contentBoxes}>
            <View style={styles.contentBox}>
              <Text style={styles.heading}>Your stuff</Text>
              <Stack size={12} />
              <Divider style={styles.thinDivider} />
              <Stack size={4} />
              <TouchableOpacity style={styles.rowItem} onPress={ () => navigation.navigate('Bookmarks')}>
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

export function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="Bookmarks" component={BookmarkScreen} />
      <ProfileStack.Screen name="Articles" component={ArticleScreen}/>
    </ProfileStack.Navigator>
  );
}

const styles = StyleSheet.create({
  profileScreen: {
    flex: 1,
    paddingVertical: 36,
    paddingHorizontal: 36,
    backgroundColor: 'white',
    alignItems: 'stretch',
  },
  intro: {
    alignItems: 'center',
  },
  title: {
    ...Typography.h1,
  },
  reward: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coffeeCount: {
    marginLeft: 2, // because the coffee icon is slightly imbalanced
    // alignItems: 'center',
  },
  rewardText: {
    ...Typography.p,
  },
  divider: {
    height: 1,
  },
  contentBoxes: {
  },
  contentBox: {
  },
  heading: {
    ...Typography.h2,
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
