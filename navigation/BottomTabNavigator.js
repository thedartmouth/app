import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import FeedScreen from '../screens/FeedScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PollsScreen from '../screens/PollsScreen';
import ArticleScreen from '../screens/ArticleScreen';
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
            <TabBarIcon focused={focused} name='ios-book' />
          ),
        }}
      />
      <BottomTab.Screen
        name='Polls'
        component={PollsScreen}
        options={{
          title: 'Polls',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='ios-podium' />
          ),
        }}
      />
      <BottomTab.Screen
        name='Me'
        component={ProfileScreen}
        options={{
          title: 'My Profile',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='ios-person' />
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
    shadowOffset: { height: -50 },
		shadowRadius: 50,
		shadowColor: 'white',
    shadowOpacity: 1.0,
		shadowOffset: { height: -3 },
		shadowRadius: 10,
		shadowColor: 'gray',
		shadowOpacity: 0.3,
  },
});
