import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Linking, Dimensions } from 'react-native';
import axios from 'axios';
import Article from './MINDArticle';

const { height, width } = Dimensions.get('window');

export default function App() {
  const [predictionData, setPredictionData] = useState(null);
  const user_id = 'U44825';

  const fetchData = async (userId) => {
    try {
      const response = await axios.post('http://192.168.1.79:8000/predict', {
        user_id: userId,
      });

      setPredictionData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  useEffect(() => {
    fetchData(user_id);
  }, []);

  const openUrl = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>We ballin 🏀</Text>
      {predictionData && (
        <ScrollView style={styles.scrollView}>
          {predictionData.recommended_items && predictionData.recommended_items.length > 0 ? (
            predictionData.recommended_items.map((item) => (
              <Article
                key={item.itemId}
                title={item.title}
                category={item.category}
                abstract={item.abstract}
                onPress={() => openUrl(item.url)}
              />
            ))
          ) : (
            <Text style={styles.noItemsText}>No recommended items found.</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  headerText: {
    fontSize: Math.round(Math.min(height, width) * 0.05), // Responsive font size
    fontWeight: 'bold',
    marginTop: Math.round(height * 0.06), // Responsive top margin (halved)
    marginBottom: Math.round(height * 0.0005), // Responsive bottom margin (halved)
    textAlign: 'center',
  },
  scrollView: {
    marginTop: Math.round(height * 0.02), // Responsive top margin
  },
  noItemsText: {
    textAlign: 'center',
    marginTop: Math.round(height * 0.03), // Responsive top margin
    color: '#555',
  },
});
