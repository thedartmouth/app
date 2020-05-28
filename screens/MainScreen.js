import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Link } from 'react-router-dom';
import {
	Alert,
	Button,
	Image,
	Platform,
	RefreshControl,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Divider } from 'react-native-elements';
import { Container, Header, Content, Tab, Tabs } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import {Stack} from 'react-native-spacing-system';
import ArticleCard from '../components/ArticleCard';
import { MonoText } from '../components/StyledText';
import { useSafeArea } from 'react-native-safe-area-context';

const renderArticle = (articles) => {
	articles.map();
};

export default function HomeScreen() {
	const topicBarItems = [
		'COVID-19',
		'NEWS',
		'OPINION',
		'SPORTS',
		'ARTS',
		'MIRROR',
		'MULTIMEDIA',
	];

	const article1 = {
		CEOID: '1',
		category: {name: 'NEWS'},
		headline: 'Dartmouth to apply for $1.7 million in CARES Act funding',
		authors: [{name: 'Lauren Adler'}],
		publishedAt: '5/21/20 2:15am',
		views: 1,
		articleImageURL: 'https://snworksceo.imgix.net/drt/c4546441-fd5f-4798-ba71-0bffc946729f.sized-1000x1000.jpg?w=800',
		content:
      'Dartmouth will apply for the first half of its allotted funding from the Coronavirus Aid, Relief, and Economic Security Act, College President Phil Hanlon announced today. As required by the federal government, the funding will be used for emergency financial aid.			',
	};

	const article2 = {
		CEOID: '2',
		category: {name: 'NEWS'},
		headline: 'Q&A with CNN correspondent Jake Tapper ’91',
		authors: [{name: 'Lauren Adler'}],
		publishedAt: '5/21/20 2:15am',
		views: 1,
		imageURL: '../assets/images/article1.jpg',
		content:
      'Before Jake Tapper ’91 became host of CNN’s “The Lead” and “State of the Union” and one of the nation’s most respected political correspondents, he got his start as a cartoonist for The Dartmouth. In an interview with The Dartmouth, Tapper discussed the COVID-19 pandemic and the current state of journalism in the U.S.',
	};

	const articles = [article1, article2];

	const wait = (timeout) => {
		return new Promise(resolve => {
			setTimeout(resolve, timeout);
		});
	}

	const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

	return (
		<View style={[styles.mainScreen, {paddingTop: useSafeArea().top}]}>
			<View style={styles.bannerContainer}>
				<Stack size={20}></Stack>
				<Image
					source={require('../assets/images/banner.png')}
					style={styles.titleImage}
				/>
				<Stack size={20}></Stack>
			</View>
			<View style={styles.topicBar}>
				<ScrollView horizontal={true} showsHorizontalScrollIndicator={false} bounces={false}>
					{topicBarItems.map((item) => {
						return (
							<View key={item} style={styles.topicBarItem}>
								<Text>{item}</Text>
							</View>
						);
					})}
				</ScrollView>
			</View>
			<ScrollView style={styles.articleBox} vertical={true} refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
				<Stack size={18}></Stack>
				{articles.map((article) => {
					return (
						<View key={article.CEOID}>
							<Stack size={18}></Stack>
							<ArticleCard article={article}></ArticleCard>
							<Stack size={18}></Stack>
							<Divider></Divider>
						</View>
					);
				})}
			</ScrollView>
		</View>
	);
}

HomeScreen.navigationOptions = {
	header: null,
};

const styles = StyleSheet.create({
	mainScreen: {
		flex: 1,
		backgroundColor: 'white',
	},
	bannerContainer: {
		backgroundColor: 'white',
		zIndex: 1,
		alignItems: 'center',
	},
	titleImage: {
		flex: 0,
		// width: 200,
		height: 30,
		resizeMode: 'contain',
		// borderColor: 'black',
		// borderWidth: 1,
	},
	topicBar: {
		height: 35,
		shadowOffset: { width: 1, height: 1 },
		shadowColor: 'black',
		shadowOpacity: 0.3,
	},
	topicBarItem: {
		height: 35,
		backgroundColor: 'white',
		// flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderStyle: 'solid',
		borderColor: '#BDBDBD',
		borderLeftWidth: 0.5,
		borderRightWidth: 0.5,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		paddingHorizontal: 15,
	},
	articleBox: {
		flex: 1,
		paddingHorizontal: 36,
	},
});
