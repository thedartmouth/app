import React, { Component } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity, Image } from 'react-native';
import { Divider } from 'react-native-elements';
import { Ionicons, SimpleLineIcons, FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaConsumer } from 'react-native-safe-area-context';
import { Stack, Queue } from "react-native-spacing-system";
import { Typography, Colors } from '../constants';
import { ScrollView } from 'react-native-gesture-handler';

export default class ArticleScreen extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      // scrollY: new Animated.Value(0),
    };
  }

  render() {
    return (
      <SafeAreaConsumer>
        {insets => (
            <View style={styles.screen}>
            <View style={styles.topTab}>
              <Ionicons name="ios-arrow-back" size={24} color="black" onPress={this.props.navigation.goBack} style={styles.back} />
            </View>
              <ScrollView>
                <View style={styles.articleContent}>
                  <Stack size={12}></Stack>
                  <Text style={styles.category}>Sports</Text>
                  <Stack size={12}></Stack>
                  <Text style={styles.articleTitle}>Sample Article Title</Text>
                  <Stack size={12}></Stack>
                  <View style={styles.authorCountArea}>
                    <View style={styles.authorArea}>
                      <Text style={styles.author}>by Ziray Hao</Text>
                      <Queue size={8}></Queue>
                      <Ionicons style={styles.authorAdd} name="ios-add" size={16} color="gray" />
                    </View>
                    <Text style={styles.count}># view cnt.</Text>
                  </View>
                  <Stack size={12}></Stack>
                  <Image
                      source={require('../assets/images/article2.jpg')}
                      style={styles.articleImage}
                  />
                  <Stack size={12}></Stack>
                  <Text style={styles.abstract}>Dartmouth will apply for the first half of its alloted
                  funding from the Coronavirus Aid, Relief, and Economic Security Act, College President
                  Phil Hanlon announced today. As required by the federal government, the funding will
                  be used for emergency financial aid.</Text>
                </View>
              </ScrollView>
              <View style={styles.bottomTab}>
                <Stack size={10}></Stack>
                <View style={styles.bottomTabButtons}>
                  <FontAwesome5 name="praying-hands" size={25} color="gray" />
                  <FontAwesome5 name="bookmark" size={25} color="gray" />
                  <Ionicons name="ios-share" size={35} color="gray" />
                </View>
              </View>
            </View>
        )}
      </SafeAreaConsumer>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: 'white',
  },
  topTab: {
    zIndex: 1,
    borderWidth: 1,
    borderColor: '#e5e6e9',
    position: 'absolute',
    top: 0,
    width: '100%',
    height: 80,
    backgroundColor: 'white',
  },
  articleContent: {
    flex: 1,
    paddingVertical: 85,
    paddingHorizontal: 36,
    backgroundColor: 'white',
    alignItems: 'stretch',
  },
  back: {
    position: 'absolute',
    top: 45,
    left: 20,
  },
  intro: {
    alignItems: 'flex-start',
  },
  articleTitle: {
    ...Typography.h2,
    ...Typography.serif,
  },
  category: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: Colors.green,
    overflow: 'hidden', // needed to show the borderRadius with backgroundColor
    textTransform: 'uppercase',
  },
  authorCountArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  authorArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  count: {
    ...Typography.sans,
  },
  author: {
    color: 'grey',
    ...Typography.p,
    ...Typography.sans,
  },
  authorAdd: {
    marginTop: 2, // correction
  },
  articleImage: {
    width: '100%',
    maxHeight: 200,
    resizeMode: 'cover',
  },
  abstract: {
    textAlign: 'justify',
    ...Typography.p,
    ...Typography.serif,
  },
  bottomTab: {
    borderWidth: 1,
    borderColor: '#e5e6e9',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 1,
    backgroundColor: 'white',
    height: 80,
  },
  bottomTabButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

// export default function ArticleScreen({navigation}) {
//   return (
//     <SafeAreaConsumer>
//       {insets => (
//           <View style={styles.screen}>
//           <View style={styles.topTab}>
//             <Ionicons name="ios-arrow-back" size={24} color="black" onPress={navigation.goBack} style={styles.back} />
//           </View>
//             <ScrollView>
//               <View style={styles.articleContent}>
//                 <Stack size={12}></Stack>
//                 <Text style={styles.category}>Sports</Text>
//                 <Stack size={12}></Stack>
//                 <Text style={styles.articleTitle}>Sample Article Title</Text>
//                 <Stack size={12}></Stack>
//                 <View style={styles.authorCountArea}>
//                   <View style={styles.authorArea}>
//                     <Text style={styles.author}>by Ziray Hao</Text>
//                     <Queue size={8}></Queue>
//                     <Ionicons style={styles.authorAdd} name="ios-add" size={16} color="gray" />
//                   </View>
//                   <Text style={styles.count}># view cnt.</Text>
//                 </View>
//                 <Stack size={12}></Stack>
//                 <Image
//                     source={require('../assets/images/article2.jpg')}
//                     style={styles.articleImage}
//                 />
//                 <Stack size={12}></Stack>
//                 <Text style={styles.abstract}>Dartmouth will apply for the first half of its alloted
//                 funding from the Coronavirus Aid, Relief, and Economic Security Act, College President
//                 Phil Hanlon announced today. As required by the federal government, the funding will
//                 be used for emergency financial aid.</Text>
//               </View>
//             </ScrollView>
//             <View style={styles.bottomTab}>
//               <Stack size={10}></Stack>
//               <View style={styles.bottomTabButtons}>
//                 <FontAwesome5 name="praying-hands" size={25} color="gray" />
//                 <FontAwesome5 name="bookmark" size={25} color="gray" />
//                 <Ionicons name="ios-share" size={35} color="gray" />
//               </View>
//             </View>
//           </View>
//       )}
//     </SafeAreaConsumer>
//   );
// }

// const styles = StyleSheet.create({
//   screen: {
//     backgroundColor: 'white',
//   },
//   topTab: {
//     zIndex: 1,
//     borderWidth: 1,
//     borderColor: '#e5e6e9',
//     position: 'absolute',
//     top: 0,
//     width: '100%',
//     height: 80,
//     backgroundColor: 'white',
//   },
//   articleContent: {
//     flex: 1,
//     paddingVertical: 85,
//     paddingHorizontal: 36,
//     backgroundColor: 'white',
//     alignItems: 'stretch',
//   },
//   back: {
//     position: 'absolute',
//     top: 45,
//     left: 20,
//   },
//   intro: {
//     alignItems: 'flex-start',
//   },
//   articleTitle: {
//     ...Typography.h2,
//     ...Typography.serif,
//   },
//   category: {
//     alignSelf: 'flex-start',
//     paddingVertical: 4,
//     paddingHorizontal: 12,
//     borderRadius: 8,
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'white',
//     backgroundColor: Colors.green,
//     overflow: 'hidden', // needed to show the borderRadius with backgroundColor
//     textTransform: 'uppercase',
//   },
//   authorCountArea: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   authorArea: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   count: {
//     ...Typography.sans,
//   },
//   author: {
//     color: 'grey',
//     ...Typography.p,
//     ...Typography.sans,
//   },
//   authorAdd: {
//     marginTop: 2, // correction
//   },
//   articleImage: {
//     width: '100%',
//     maxHeight: 200,
//     resizeMode: 'cover',
//   },
//   abstract: {
//     textAlign: 'justify',
//     ...Typography.p,
//     ...Typography.serif,
//   },
//   bottomTab: {
//     borderWidth: 1,
//     borderColor: '#e5e6e9',
//     position: 'absolute',
//     bottom: 0,
//     width: '100%',
//     zIndex: 1,
//     backgroundColor: 'white',
//     height: 80,
//   },
//   bottomTabButtons: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-evenly',
//   },
// });
