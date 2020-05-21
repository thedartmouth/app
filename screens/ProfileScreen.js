import * as React from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { Divider } from 'react-native-elements';
import { Typography } from '../constants'; 

export default function ProfileScreen() {
  return (
    <View style={styles.screen}>
      <View style={styles.intro}>
        <Text style={styles.title}>Hello, Jessica.</Text>
        <View style={styles.reward}>
          <Text style={styles.rewardText}>coffee cups earned</Text>
        </View>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.settings}>
        <Text style={styles.settingsHeading}>Notification settings</Text>
        <View style={styles.setting}>
          <Text style={Typography.p}>Trending articles</Text>
          <Switch/>
        </View>
        <View style={styles.setting}>
          <Text style={Typography.p}>Followed tags</Text>
          <Switch/>
        </View>
        <View style={styles.setting}>
          <Text style={Typography.p}>Followed writers</Text>
          <Switch/>
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
    marginBottom: 36,
  },
  reward: {
    
  },
  rewardText: {
    ...Typography.p,
  },
  divider: {
    height: 1,
    marginVertical: 36,
  },
  settings: {
  },
  settingsHeading: {
    ...Typography.h2,
    marginBottom: 18,
  },
  setting: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  header2: {
    marginTop: 24,
    marginBottom: 24,
  },
});
