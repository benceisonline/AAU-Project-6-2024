import React from 'react'; 
import { Image, View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { globalStyles, layout } from '../GlobalStyles';
import Error from '../components/Error';
import PropTypes from 'prop-types';

const { height } = Dimensions.get('window');

export default function Article({ route }) {
	const journalistName = "Lasse Claes";
	const navigation = useNavigation();
	const { article } = route.params;

	if (!article) {
		return(
			<Error errorText={'Aktiklen blev ikke fundet'} />
		);
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView 
				style={styles.scrollView}
				showsVerticalScrollIndicator={false} 
				showsHorizontalScrollIndicator={false}
			>
					<TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
							<Ionicons name="arrow-back" size={height * 0.04} color="black" />
							<Text style={globalStyles.headline}>Artikler</Text>
					</TouchableOpacity>

					<Image source={require('../assets/cool_building.jpg')} style={styles.cover} />

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

							<Text style={globalStyles.bodyText}>
								{ article.body }
							</Text>
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
			paddingTop: '4.5%',
			paddingBottom: '11%',
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
    }
});