import * as React from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { Stack, Queue } from "react-native-spacing-system";
import { Typography } from '../constants'; 

export default function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.intro}>
        <Text style={styles.title}>Hello, Jessica.</Text>
        <Stack size={36}></Stack>
        <View style={styles.reward}>
          <View>
            <SimpleLineIcons name="cup" size={24} color="black" />
            <Text style={styles.coffeeCount}>16</Text>
          </View>
          <Queue size={18}></Queue>
          <Text style={styles.rewardText}>coffee cups earned!</Text>
        </View>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.contentBoxes}>
        <View style={styles.contentBox}>
          <Text style={styles.heading}>Your stuff</Text>
          <Stack size={12}></Stack>
          <Divider style={styles.thinDivider} />
          <Stack size={4}></Stack>
          <TouchableOpacity style={styles.rowItem}>
              <Text style={Typography.p}>Bookmarks</Text>
              <Ionicons name='ios-arrow-forward' size={24} style={styles.rowItemIcon}></Ionicons>
          </TouchableOpacity>
          <Stack size={4}></Stack>
          <Divider style={styles.thinDivider} />
          <Stack size={4}></Stack>
          <TouchableOpacity style={styles.rowItem}>
              <Text style={Typography.p}>Followed authors</Text>
              <Ionicons name='ios-arrow-forward' size={24} style={styles.rowItemIcon}></Ionicons>
          </TouchableOpacity>
          <Stack size={4}></Stack>
          <Divider style={styles.thinDivider} />
          <Stack size={4}></Stack>
          <TouchableOpacity style={styles.rowItem}>
                <Text style={Typography.p}>Completed polls</Text>
                <Ionicons name='ios-arrow-forward' size={24} style={styles.rowItemIcon}></Ionicons>
          </TouchableOpacity>
          <Stack size={4}></Stack>
          <Divider style={styles.thinDivider} />
        </View>
        <Stack size={24}></Stack>
        <View style={styles.contentBox}>
          <Text style={styles.heading}>Notification settings</Text>
          <Stack size={12}></Stack>
          <View style={styles.rowItem}>
            <Text style={Typography.p}>Trending articles</Text>
            <Switch/>
          </View>
          <Stack size={8}></Stack>
          <View style={styles.rowItem}>
            <Text style={Typography.p}>Followed tags</Text>
            <Switch/>
          </View>
          <Stack size={8}></Stack>
          <View style={styles.rowItem}>
            <Text style={Typography.p}>Followed writers</Text>
            <Switch/>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 36,
    backgroundColor: '#fafafa',
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
    marginVertical: 36,
  },
  contentBoxes : {
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
