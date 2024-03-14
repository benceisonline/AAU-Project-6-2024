import React, { useState, useEffect } from 'react'; 
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import NewsCard from '../components/NewsCard';
import NewsHeader from '../components/NewsHeader';
import { layout } from '../GlobalStyles';
import fetchData from '../utils/AxiosRequest'; // Import fetchData function from AxiosRequest file

export default function NewsFeedScreen() {
  const [recommendedArticles, setRecommendedArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await fetchData("1765193"); // Pass the user_id to fetch data
        setRecommendedArticles(data.recommended_items);
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

  return (
    <SafeAreaView style={ styles.container } >
      <NewsHeader onPressedSubView={onPressedSubView} />
      <ScrollView 
        style={ styles.feed } 
        showsVerticalScrollIndicator={false} 
        showsHorizontalScrollIndicator={false}
      >
        {recommendedArticles.map((article, index) => (
          <NewsCard key={index} article={article} />
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
