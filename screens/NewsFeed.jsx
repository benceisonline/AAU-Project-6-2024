import React, { useState, useEffect, useRef } from 'react'; 
import { StyleSheet, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import { layout } from '../GlobalStyles';
import NewsCard from '../components/NewsCard';
import NewsHeader from '../components/NewsHeader';
import BouncingLogo from '../components/BouncingLogo';
import Error from '../components/Error';
import { fetchPredictions, fetchAllArticles } from '../utils/AxiosRequest';
import ERRORACTIONS from '../constants/ErrorActions';
import SplashScreen from '../components/SplashScreen'; 

export default function NewsFeedScreen() {
  const scrollViewRef = useRef(null);
  const [waiting, setWaiting] = useState(true);
  const [subview, setSubview] = useState(1);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const loadingTimeout = 2000;
  const userID = "1812344"; 

  const fetchData = async (loadMore) => {
    setWaiting(true);

    try {
      let data;
      switch (subview) {
        // Til dig
        case 1:
          loadMore ? data = await fetchPredictions(userID, articles.length, 10) : data = await fetchPredictions(userID, 0, 10) ;
          break;
        // Alle nyheder
        case 3:
          loadMore ? data = await fetchAllArticles(articles.length, 10) : data = await fetchAllArticles(0, 10);
          break;
        default:
          break;
      };

      if (loadMore) {
        setArticles(prevArticles => {
          let existingArticlesIds = prevArticles.map(article => article.article_id);

          const filteredData = data.news.filter(item => !existingArticlesIds.includes(item.article_id));
          
          if (filteredData.length !== 0)
            return [...prevArticles, ...data.news];

          return prevArticles;
        });
      } else {
        setArticles(data.news);
      }

      setWaiting(false);
      
      // Set loading to false after fetching articles, but wait at least 2000ms
      if (loading) {
        setTimeout(() => {
          setLoading(false);
        }, loadingTimeout);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      // Handle error appropriately, e.g., set loading to false
			setLoading(false);
      setWaiting(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchData(false);
    setIsRefreshing(false);
  };

	const handleLoadMore = async (event) => {
		const { layoutMeasurement, contentSize, contentOffset } = event.nativeEvent;
    // Fetch more articles when user has scrolled almost to the bottom of the screen
		const isAtBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 500;

    if (isAtBottom) {
      await fetchData(true);
    }
  }

  const onPressedSubView = (id) => {
    setSubview(id);
  };

  const onPressedLogo = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  }

  useEffect(() => {
    fetchData(false);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
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
      <NewsHeader onPressedSubView={onPressedSubView} onPressedLogo={onPressedLogo} />
      {waiting && <BouncingLogo />}
      {!waiting && (
        <ScrollView 
          ref={scrollViewRef}
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
          {articles.map((article) => (
            <NewsCard key={article.article_id} article={article} />
          ))}
        </ScrollView>
      )}
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
