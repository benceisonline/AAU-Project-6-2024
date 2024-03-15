import React, { useState, useEffect } from 'react'; 
import { StyleSheet, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { layout } from '../GlobalStyles';
import NewsCard from '../components/NewsCard';
import NewsHeader from '../components/NewsHeader';
import Error from '../components/Error';
import fetchPredictions from '../utils/AxiosRequest';
import ERRORACTIONS from '../constants/ErrorActions';

export default function NewsFeedScreen() {
  const [recommendedArticles, setRecommendedArticles] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const userID = "1765193"; 
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchArticles(false);
    setIsRefreshing(false);
  }

  const handleLoadMore = async (event) => {
    const { layoutMeasurement, contentSize, contentOffset } = event.nativeEvent;
    const isAtBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height;

    if (isAtBottom) {
      await fetchArticles(true);
    }
  }

  const fetchArticles = async (loadMore) => {
    try {
      const predictions = await fetchPredictions(userID, 10);
      if (loadMore) {
        setRecommendedArticles([...recommendedArticles, ...predictions.recommended_items]);
      } else {
        setRecommendedArticles(predictions.recommended_items);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const onPressedSubView = (id) => {
    switch (id) {
      case 1:
        // Handle case 1
        console.log("Case 1 is triggered");
        break;
      case 2:
        // Handle case 2
        console.log("Case 2 is triggered");
        break;
      case 3:
        // Handle case 3
        console.log("Case 3 is triggered");
        break;
      default:
        // Handle default case
        console.log("Default case is triggered");
        break;
    }
  };

  useEffect(() => {
    fetchArticles(false);
  }, []);

  if (recommendedArticles.length === 0) {
		return (
			<Error errorText={'Aktiklerne blev ikke fundet'} action={ERRORACTIONS.REFRESH} />
		);
	}

  return (
    <SafeAreaView style={ styles.container } >
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
        {recommendedArticles.map((article) => (
          <NewsCard key={article.article_id} article={article} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FCFCFC',
    ...layout.flexColumn
  },
  feed: {
    marginHorizontal: '2.5%'
  }
});
