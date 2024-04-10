import React, { useState, useEffect } from 'react'; 
import { StyleSheet, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { layout } from '../GlobalStyles';
import NewsCard from '../components/NewsCard';
import NewsHeader from '../components/NewsHeader';
import Error from '../components/Error';
import { fetchPredictions, fetchAllArticles } from '../utils/AxiosRequest';
import ERRORACTIONS from '../constants/ErrorActions';
import SplashScreen from '../components/SplashScreen'; 
import { onGoBackFromArticle, removeGoBackFromArticle } from '../utils/Events';
import { getUserHistory } from '../utils/AsyncFunctions';

export default function NewsFeedScreen() {
	const [subview, setSubview] = useState(1);
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isRefreshing, setIsRefreshing] = useState(false);
  const [clickedArticleIds, setClickedArticleIds] = useState([]);
  const [scrollPercentages, setScrollPercentages] = useState([]);
	const userID = "1078040";

	const fetchData = async (loadMore) => {
		try {
			let data;
			switch (subview) {
			// Til dig
			case 1:
				data = await fetchPredictions(userID, 10);
				break;
				// Alle nyheder
			case 3:
				data = await fetchAllArticles();
				break;
			default:
				break;
			};

			if (loadMore) {
				setArticles(prevArticles => [...prevArticles, ...data.news]);
			} else {
				setArticles(data.news);
			}
          
			// Set loading to false after fetching articles, but wait at least 2000ms
			setTimeout(() => {
				setLoading(false);
			}, 2000);
		} catch (error) {
			console.error('Error fetching articles:', error);
			// Handle error appropriately, e.g., set loading to false
			setLoading(false);
		}
	};

	const handleRefresh = async () => {
		setIsRefreshing(true);
		await fetchData(false);
		setIsRefreshing(false);
	};

	const handleLoadMore = async (event) => {
		const { layoutMeasurement, contentSize, contentOffset } = event.nativeEvent;
		const isAtBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height;

		if (isAtBottom) {
			await fetchData(true);
		}
	}

	const onPressedSubView = (id) => {
		setSubview(id);
	};

  const setUserHistory = async () => {
    const userHistory = await getUserHistory();
    setClickedArticleIds(userHistory.clicked_article_ids);
    setScrollPercentages(userHistory.scroll_percentages);
  };

  const handleGoBackFromArticle = (data) => {
    setClickedArticleIds(data.clicked_article_ids);
    setScrollPercentages(data.scroll_percentages);
  }

	useEffect(() => {
		fetchData(false);

    setUserHistory();

    onGoBackFromArticle(handleGoBackFromArticle);

		setTimeout(() => {
			setLoading(false);
		}, 2000);

    return () => {
      removeGoBackFromArticle(handleGoBackFromArticle);
    };
	}, [subview]);
  
	if (loading) {
		return <SplashScreen />;
	}

	if (!articles || articles.length === 0) {
		return (
			<Error errorText={'Artiklerne blev ikke fundet.'} action={ERRORACTIONS.REFRESH} />
		);
	}

	return (
		<SafeAreaView style={ styles.container }>
			<NewsHeader onPressedSubView={onPressedSubView} />
			<ScrollView 
				style={ styles.feed } 
				showsVerticalScrollIndicator={false} 
				showsHorizontalScrollIndicator={false}
				onScroll={handleLoadMore}
				scrollEventThrottle={200}
				refreshControl={
					<RefreshControl
						color={'#E3141D'}
						tintColor={'#E3141D'}
						title='Opdaterer...'
						refreshing={isRefreshing}
						onRefresh={handleRefresh}
					/>
				}
			>
				{articles.map((article) => {
        let scrollPercentage = 0;
        if (clickedArticleIds !== null) {
          console.log('clicked_article_ids:', clickedArticleIds);
          const index = clickedArticleIds.indexOf(article.article_id);
          scrollPercentage = index !== -1 ? scrollPercentages[index] : 0;
        }

        return (
          <NewsCard 
            key={article.article_id} 
            article={article} 
            userID={userID}
            scrollPercentage={scrollPercentage}
          />
        );
      })}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FCFCFC',
		...layout.flexColumn
	},
	feed: {
		flex: 1,
		marginHorizontal: '2.5%'
	}
});
