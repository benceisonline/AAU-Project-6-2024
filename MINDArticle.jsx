import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';

const Article = ({ title, category, abstract, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.articleContainer}>
      <View style={styles.articleContent}>
        <Text style={styles.articleTitle}>{title}</Text>
        <Text style={styles.articleCategory}>{category}</Text>
        <Text style={styles.articleAbstract}>{abstract}</Text>
      </View>
    </TouchableOpacity>
  );
};

Article.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  abstract: PropTypes.string,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  articleContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ddd', // Grey top border color
    backgroundColor: '#f5f5f5',
    marginVertical: 10,
    padding: 15,
  },
  articleContent: {
    justifyContent: 'center',
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  articleCategory: {
    color: '#666',
    marginBottom: 5,
  },
  articleAbstract: {
    color: '#444',
    marginTop: 5,
  },
});

export default Article;
