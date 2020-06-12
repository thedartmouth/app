import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import { StyleSheet } from 'react-native';
// import MainScreen from '../screens/MainScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import PollsScreen from '../screens/PollsScreen';
import TabBarIcon from '../components/TabBarIcon';
// import { Foundation } from '@expo/vector-icons'; 
// import { Colors } from '../constants';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Article';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html

  return (
    <BottomTab.Navigator
      initialRouteName={INITIAL_ROUTE_NAME}
      tabBarOptions={{ style: styles.tabBar, showLabel: false }}
    >
      <BottomTab.Screen
        name="Clap"
        // component={MainScreen}
        options={{
          title: 'Clap',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="hands" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Polls"
        component={PollsScreen}
        options={{
          title: 'Polls',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="ios-podium" />
          ),
        }}
      />
      <BottomTab.Screen
        name="Me"
        component={ProfileScreen}
        options={{
          title: 'My Profile',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name="ios-arrow-back" />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
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
