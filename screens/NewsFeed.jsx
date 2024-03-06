import React from 'react'; 
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import NewsCard from '../components/NewsCard';

// mock data
const newsData = [
  {
    journalist: { name: 'Lasse Claes', imageID: 'lasse_claes.jpg' },
    news: {
      title: 'Opinion: Han ligner én, der stadig har nøglerne til borgen.',
      category: 'Opinion',
      timestamp: '34m'
    }
  },
  {
    journalist: { name: 'Lasse Claes', imageID: 'lasse_claes.jpg' },
    news: {
      title: 'Opinion: Han ligner én, der stadig har nøglerne til borgen.',
      category: 'Opinion',
      timestamp: '34m'
    }
  },
  {
    journalist: { name: 'Lasse Claes', imageID: 'lasse_claes.jpg' },
    news: {
      title: 'Opinion: Han ligner én, der stadig har nøglerne til borgen.',
      category: 'Opinion',
      timestamp: '34m'
    }
  },
  {
    journalist: { name: 'Lasse Claes', imageID: 'lasse_claes.jpg' },
    news: {
      title: 'Opinion: Han ligner én, der stadig har nøglerne til borgen.',
      category: 'Opinion',
      timestamp: '34m'
    }
  },
];

export default function NewsFeedScreen() {
  return (
    <SafeAreaView style={ styles.container } >
      <ScrollView 
        style={ styles.feed } 
        showsVerticalScrollIndicator={false} 
        showsHorizontalScrollIndicator={false}
      >
        {newsData.map((item, index) => (
          <NewsCard key={index} journalist={item.journalist} news={item.news} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  feed: {
    marginHorizontal: '2.5%'
  }
});