import React from 'react'; 
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import NewsCard from '../components/NewsCard';
import NewsHeader from '../components/NewsHeader';
import { layout } from '../GlobalStyles';

// mock data
const newsData = [
  {
    journalist: { name: 'Lasse Claes', imageID: 'lasse_claes.jpg' },
    news: {
      title: 'Opinion: Han ligner én, der stadig har nøglerne til borgen.',
      category: 'Opinion',
      timestamp: '34m',
      breaking: true
    }
  },
  {
    journalist: { name: 'Lasse Claes', imageID: 'lasse_claes.jpg' },
    news: {
      title: 'Opinion: Han ligner én, der stadig har nøglerne til borgen.',
      category: 'Opinion',
      timestamp: '34m',
      breaking: false
    }
  },
  {
    journalist: { name: 'Lasse Claes', imageID: 'lasse_claes.jpg' },
    news: {
      title: 'Opinion: Han ligner én, der stadig har nøglerne til borgen.',
      category: 'Opinion',
      timestamp: '34m',
      breaking: false
    }
  },
  {
    journalist: { name: 'Lasse Claes', imageID: 'lasse_claes.jpg' },
    news: {
      title: 'Opinion: Han ligner én, der stadig har nøglerne til borgen.',
      category: 'Opinion',
      timestamp: '34m',
      breaking: false
    }
  },
];

export default function NewsFeedScreen() {
  
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
    backgroundColor: '#FCFCFC',
    ...layout.flexColumn
  },
  feed: {
    marginHorizontal: '2.5%'
  }
});