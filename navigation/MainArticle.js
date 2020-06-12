import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ArticleScreen from '../screens/ArticleScreen';
import MainScreen from '../screens/MainScreen';

const StackNav = createStackNavigator();

const StackNavigator = () => {
  return (
    <StackNav.Navigator>
      <StackNav.Screen
        name="Main"
        component={MainScreen}
      />
      <StackNav.Screen
        name="Article"
        component={ArticleScreen}
      />
    </StackNav.Navigator>
  );
};

export default StackNavigator;
