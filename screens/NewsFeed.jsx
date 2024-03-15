import React, { useState, useEffect } from 'react'; 
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { layout } from '../GlobalStyles';
import NewsCard from '../components/NewsCard';
import NewsHeader from '../components/NewsHeader';
import Error from '../components/Error';
import fetchPredictions from '../utils/AxiosRequest'; // Import fetchData function from AxiosRequest file

export default function NewsFeedScreen() {
  const [recommendedArticles, setRecommendedArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const userID = "1765193"; 
        const predictions = await fetchPredictions(userID);
        setRecommendedArticles(predictions.recommended_items);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

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

  if (recommendedArticles.length === 0) {
		return(
			<Error errorText={'Aktiklerne blev ikke fundet'} />
		);
	}

  return (
    <SafeAreaView style={ styles.container } >
      <NewsHeader onPressedSubView={onPressedSubView} />
      <ScrollView 
        style={ styles.feed } 
        showsVerticalScrollIndicator={false} 
        showsHorizontalScrollIndicator={false}
      >
        {recommendedArticles.map((article, index) => (
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
