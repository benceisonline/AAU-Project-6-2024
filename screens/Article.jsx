import React, { useState, useEffect } from 'react'; 
import { Image, View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { globalStyles, layout } from '../GlobalStyles';
import ERRORACTIONS from '../constants/ErrorActions';
import Error from '../components/Error';
import PropTypes from 'prop-types';
import PlusIndicator from '../components/PlusIndicator';
import { AddClickedArticle, getCurrentTimestamp, getUserHistory } from '../utils/AsyncFunctions';
import { emitGoBackFromArticle } from '../utils/Events';

const { height } = Dimensions.get('window');

export default function Article({ route }) {
	const navigation = useNavigation();
	const { article } = route.params;
	const [readTime, setReadTime] = useState(0);
	const [scrollPercentage, setScrollPercentage] = useState(0);
	const [scrollHeight, setScrollHeight] = useState(0);
	const journalistName = "Lasse Claes";

	// Update scroll percentage on scroll
	const handleScroll = (event) => {
		const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
		const currentScrollHeight = contentSize.height - layoutMeasurement.height;
		const currentScrollPercentage = (contentOffset.y / currentScrollHeight) * 100;
		setScrollHeight(currentScrollHeight);
		setScrollPercentage(currentScrollPercentage);
	};

	const horizontalRedLineStyles = {
		width: `${scrollPercentage}%`,
	};

	// Update read time every second
	useEffect(() => {
		const interval = setInterval(() => {
			setReadTime((prevReadTime) => prevReadTime + 1);
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	// Save read time, scroll percentage, and other data when navigating away from the article
	const handleOnBack = async () => {
		if (scrollPercentage > 100) {
			scrollPercentage = 100;
		}

		const dataToSave = {
			article_id: article.article_id,
			timestamp: getCurrentTimestamp(),
			read_time: readTime,
			scroll_percentage: scrollPercentage
		};

		const userId = "1812344";
		AddClickedArticle(dataToSave, userId, readTime, scrollPercentage);
		const userHistory = await getUserHistory();
		emitGoBackFromArticle({ clicked_article_ids: userHistory.clicked_article_ids, scroll_percentages: userHistory.scroll_percentages });
		navigation.goBack();
	};	

	if (!article) {
		return(
			<Error errorText={'Artiklen blev ikke fundet'} action={ERRORACTIONS.BACK}/>
		);
	}

	const paragraphs = article.body.split('\n');

	const renderedParagraphs = paragraphs.map((paragraph, index) => {
		if (paragraph.includes('--------- SPLIT ELEMENT ---------')) {
			return null; // Skip rendering this paragraph
		}

		return (
			<Text key={index} style={globalStyles.bodyText}>
				{paragraph}
				{'\n'} {/* Adding an extra newline character at the end of each paragraph */}
			</Text>
		);
	});

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<PlusIndicator isActive={true} />
				<TouchableOpacity style={styles.headerMenu} onPress={handleOnBack}>
					<Ionicons name="arrow-back" size={height * 0.04} color="black" />
					<Text style={globalStyles.headline}>Artikler</Text>
				</TouchableOpacity>
			</View>
			{scrollPercentage > 0 && <View style={[styles.horizontalRedLine, horizontalRedLineStyles]} />}
			<ScrollView 
				style={styles.scrollView}
				showsVerticalScrollIndicator={false} 
				showsHorizontalScrollIndicator={false}
				onScroll={handleScroll}
				scrollEventThrottle={16} // Adjust the throttle value as needed
			>
				<Image source={{ uri: article.image_url }} style={styles.cover} />

				<View style={styles.content}>
					<Text style={styles.articleTitle}>
						{ article.title }
					</Text>

					<View style={styles.authorContainer}>
						<Text>Af </Text>
						<Text style={styles.authorName}>
							{ journalistName }
						</Text>
					</View>

					{renderedParagraphs}

				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

Article.propTypes = {
	news: PropTypes.shape({
		newsId: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		journalistName: PropTypes.string.isRequired,
		coverImage: PropTypes.string.isRequired,
		category: PropTypes.string.isRequired,
		timestamp: PropTypes.string.isRequired,
		breaking: PropTypes.bool.isRequired,
		body: PropTypes.string.isRequired,
	}),
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		alignItems: 'center',
		paddingHorizontal: '4%',
		...layout.flexRow,
	},
	scrollView: {
		marginTop: '4.5%',
	},
	cover: {
		width: '100%',
		height: height * 0.23,
		resizeMode: 'cover', 
	},
	content: {
		paddingHorizontal: '4%',
	},
	articleTitle: {
		paddingVertical: '4.5%',
		...globalStyles.articleTitle
	},
	authorContainer: {
		alignItems: 'center',
		paddingBottom: '6.5%',
		...layout.flexRow,
	},
	authorName: {
		textDecorationLine: 'underline',
	},
	headerMenu: {
		...layout.flexRow,
		alignItems: 'center',
		top: 0,
	},
	horizontalRedLine: {
		...globalStyles.horizontalRedLine,
		top: 0,
		left: 0,
		right: 0,
	},	 
});
