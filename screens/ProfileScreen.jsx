import * as React from 'react';
import { connect } from 'react-redux';
import { actions } from '../store';
import {
  StyleSheet, Text, View, Switch, TouchableOpacity,
} from 'react-native';
import { Divider } from 'react-native-elements';
import { Ionicons, SimpleLineIcons } from '@expo/vector-icons';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import { Box, Stack, Queue } from '../components/layout';
import { Typography, Colors, POLICY_URL } from '../constants';
import ResultsScreen from './ResultsScreen';
import ArticleScreen from './ArticleScreen';
import { Linking} from 'expo';
import HTML from 'react-native-render-html';
import { createStackNavigator } from '@react-navigation/stack';
import VoxButton from '../components/VoxButton';
import { ScrollView } from 'react-native-gesture-handler';

const ProfileStack = createStackNavigator();

class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', () => {
      this.checkAuth()
    })
  }

  checkAuth = () => {
    if (!this.props.user.lastAuth) {
      this.props.showAuthModal()
      return false
    } else return true
  }
  
  navigateProfileContent = (scenario) => {
    const authed = this.checkAuth()
    switch (scenario) {
      case 'BOOKMARKS':
        if (authed) {
          this.props.getBookmarks()
          this.props.navigation.push('Results', {bookmarks: true})
        }
        break
      case 'FOLLOWING':
        if (authed) alert('Feature coming soon!')
        break
      case 'POLLS':
        if (authed) alert('Feature coming soon!')
        break
    }
  }

  toggleProfileSetting = (setting) => {
    const prevSettings = this.props.user.data?.settings
    const updatedProfile = { settings: prevSettings }
    switch (setting) {
      case 'NOTIFICATION_TRENDING':
        updatedProfile.settings.notifications.trending = !updatedProfile.settings.notifications?.trending
        break
      case 'NOTIFICATION_TAGS':
        updatedProfile.settings.notifications.tags = !updatedProfile.settings.notifications?.tags
        break
      case 'NOTIFICATION_AUTHORS':
        updatedProfile.settings.notifications.authors = !updatedProfile.settings.notifications?.authors
        break
    }
    this.editProfileElement(updatedProfile)
  }

  editProfileElement = (updatedProfile) => {
    const authed = this.checkAuth()
    if (authed) alert('Feature coming soon!')
  }

  render() {
    return (
          <ScrollView contentContainerStyle={styles.profileScreen}>
            <Stack size={72} />
            <View style={styles.intro}>
              <Text style={styles.title}>Hello, {this.props.user.data?.name?.first || 'there'}.</Text>
              <Stack size={24} />
              <Box dir='row' align='center' style={styles.reward}>
                <SimpleLineIcons name="cup" size={24} color="black" style={styles.coffeeCup}/>
                <Queue size={8} />
                <Text style={styles.coffeeCount}>{this.props.user.data?.reads || 0}</Text>
                <Queue size={8} />
                <Text style={styles.rewardText}>coffee cups earned!</Text>
              </Box>
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
                <TouchableOpacity style={styles.rowItem} onPress={() => this.navigateProfileContent('BOOKMARKS')}>
                  <Text style={Typography.p}>Bookmarks</Text>
                  <Ionicons name="ios-arrow-forward" size={24} style={styles.rowItemIcon} />
                </TouchableOpacity>
                <Stack size={4} />
                <Divider style={styles.thinDivider} />
                <Stack size={4} />
                <TouchableOpacity style={styles.rowItem} onPress={() => this.navigateProfileContent('FOLLOWING')}>
                  <Text style={Typography.p}>Followed authors</Text>
                  <Ionicons name="ios-arrow-forward" size={24} style={styles.rowItemIcon} />
                </TouchableOpacity>
                <Stack size={4} />
                <Divider style={styles.thinDivider} />
                <Stack size={4} />
                <TouchableOpacity style={styles.rowItem} onPress={() => this.navigateProfileContent('POLLS')}>
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
                  <Switch onValueChange={() => this.editProfileElement('NOTIFICATION_TRENDING')}/>
                </View>
                <Stack size={8} />
                <View style={styles.rowItem}>
                  <Text style={Typography.p}>Followed tags</Text>
                  <Switch onValueChange={() => this.editProfileElement('NOTIFICATION_TAGS')}/>
                </View>
                <Stack size={8} />
                <View style={styles.rowItem}>
                  <Text style={Typography.p}>Followed writers</Text>
                  <Switch onValueChange={() => this.editProfileElement('NOTIFICATION_AUTHORS')}/>
                </View>
              </View>
            </View>
            <Stack size={36}></Stack>
            <HTML
              tagsStyles={{ a: styles.policy }}
              html={`<a href=${POLICY_URL}>Privacy Policy</a>`}
              onLinkPress={(_, href) => {
                Linking.openURL(href);
              }}
            ></HTML>
            <Stack size={36}></Stack>
            {this.props.user.lastAuth ?
            <>
            
            <VoxButton
              title='Logout'
              variant='hollow'
              hue='green'
              flex={1}
              // raised
              onPress={() => {
                this.props.deAuth()
                this.checkAuth()
              }}
            ></VoxButton>
            <Stack size={36}></Stack>
            </>
            :
            null
            }
            
          </ScrollView>
    );
  }
}

export default connect(
  store => ({
    user: store.user
  }),
  (dispatch) => ({
    deAuth: actions.deAuth(dispatch),
    getUser: actions.getUser(dispatch),
    showAuthModal: actions.showAuthModal(dispatch),
    getBookmarks: actions.getBookmarks(dispatch)
  }))(ProfileScreen);

// export function ProfileStackScreen() {
//   return (
//     <ProfileStack.Navigator>
//       <ProfileStack.Screen name="Profile" component={ConnectedProfileScreen} />
//       <ProfileStack.Screen name="Bookmarks" component={ResultsScreen} />
//       <ProfileStack.Screen name="Articles" component={ArticleScreen}/>
//     </ProfileStack.Navigator>
//   );
// }

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
  },
  coffeeCup: {
    marginBottom: 2, // because the coffee icon is slightly imbalanced
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
    color: Colors.pen,
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
  policy: {
    alignSelf: 'center',
    ...Typography.sansRegular,
    ...Typography.p
  }
});
