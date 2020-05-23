import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Link } from 'react-router-dom';
import {
	Alert,
	Button,
	Image,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
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
		'MIROR',
		'MULTIMEDIA',
	];

	const article1 = {
		CEOID: '1',
		category: {name: 'NEWS'},
		headline: 'Q&A with CNN correspondent Jake Tapper ’91',
		authors: [{name: 'Lauren Adler'}],
		publishedAt: '5/21/20 2:15am',
		views: 1,
		articleImageURL: '../assets/images/article1.jpg',
		content:
      'Before Jake Tapper ’91 became host of CNN’s “The Lead” and “State of the Union” and one of the nation’s most respected political correspondents, he got his start as a cartoonist for The Dartmouth. In an interview with The Dartmouth, Tapper discussed the COVID-19 pandemic and the current state of journalism in the U.S.',
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

	const insets = useSafeArea();

	return (
		<View style={[styles.screenContainer, {paddingTop: insets.top}]}>
			<View style={styles.bannerContainer}>
				<Stack size={20}></Stack>
				<Image
					source={require('../assets/images/banner.png')}
					style={styles.titleImage}
				/>
				<Stack size={20}></Stack>
			</View>
			<View style={styles.topicBar}>
				<ScrollView horizontal={true}>
					{topicBarItems.map((item) => {
						return (
							<View key={item} style={styles.topicBarItem}>
								<Text>{item}</Text>
							</View>
						);
					})}
				</ScrollView>
			</View>
			<View style={styles.articleBox}>
				<ScrollView style={{ flex: 1 }} vertical={true}>
					{articles.map((article) => {
						return (
							<View key={article.CEOID}>
								<ArticleCard article={article}></ArticleCard>
							</View>
						);
					})}
				</ScrollView>
			</View>
		</View>
	);
}

HomeScreen.navigationOptions = {
	header: null,
};

const styles = StyleSheet.create({
	screenContainer: {
		flex: 1,
		backgroundColor: '#fff',
	},
	bannerContainer: {
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
	},
});
