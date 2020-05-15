import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

export default function LinksScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.intro}>
        <Text style={styles.header1}>Hello, Jessica.</Text>
        <View>
          <Text>coffee cups earned</Text>
        </View>
      </View>

      <View>
        <Text style={styles.header2}>Notification settings</Text>
        <View style={styles.setting}>
          <Text>Trending articles</Text>
          <Switch/>
        </View>
        <View style={styles.setting}>
          <Text>Followed tags</Text>
          <Switch/>
        </View>
        <View style={styles.setting}>
          <Text>Followed writers</Text>
          <Switch/>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header1: {
    fontSize: 35,
    marginTop: 40,
    marginBottom: 40,
  },
  header2: {
    fontSize: 25,
    marginTop: 40,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
  },
  intro: {
    alignItems: 'center',
  },
  setting: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
});
