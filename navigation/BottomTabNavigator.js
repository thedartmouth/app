import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { StyleSheet } from 'react-native';

import TabBarIcon from '../components/TabBarIcon';
import MainScreen from '../screens/MainScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

// import LinksScreen from '../screens/LinksScreen';
import PollsScreen from '../screens/PollsScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Main';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{ style: styles.tabBar }}
    >
      {/* <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Get Started',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="ios-book" />
          ),
        }}
      /> */}
      <BottomTab.Screen
        name="Main"
        component={MainScreen}
        options={{
          title: 'Main',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="ios-book" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Polls"
        component={PollsScreen}
        options={{
          title: 'Polls',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="ios-book" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Me"
        component={ProfileScreen}
        options={{
          title: 'My Profile',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="ios-person" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'The Dartmouth';
    case 'Polls':
      return 'Polls';
    case 'Me':
      return 'My Profile';
  }
}

const styles = StyleSheet.create({
  tabBar: {
    height: 94,
  },
});
