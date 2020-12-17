import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import FeedScreen from '../screens/FeedScreen';
import { Colors } from '../constants';
import ProfileScreen from '../screens/ProfileScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import TabBarIcon from '../components/TabBarIcon';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Feed';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{ style: styles.tabBar, showLabel: false }}
    >
      <BottomTab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          title: 'Feed',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="ios-newspaper" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          title: 'Discover',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="ios-grid" />
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
  // const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  // switch (routeName) {
  //   case 'Home':
  //     return 'The Dartmouth';
  //   case 'Polls':
  //     return 'Polls';
  //   case 'Me':
  //     return 'My Profile';
  //   case 'Article':
  //     return 'Article';
  //   case 'Results':
  //     if (route.state?.routes[route.state.index]?.tag) {
  //       return route.state?.routes[route.state.index]?.tag;
  //     }
  //     else return 'Results';
  // }
  return 'The Dartmouth'
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.paper,
    height: 72,
    shadowOffset: { height: -3 },
    shadowRadius: 10,
    shadowColor: 'gray',
    shadowOpacity: 0.3,
    paddingBottom: 0 // override default
  },
});
