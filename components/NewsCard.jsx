import React from 'react'; 
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { layout, globalStyles } from '../GlobalStyles';
import PropTypes from 'prop-types';

const { height } = Dimensions.get('window');

export default function NewsCard({ article }) {
  const journalistName = "Lasse Claes";
  const navigation = useNavigation();

  const thumbnailHeight = height * 0.2;
  const journalistImageSize = height * 0.05;

  const handleOnPress = () => {
    navigation.navigate('Article', { article: article });
  }
  
  // Function to format date
  const formatPublishedTime = (published_time) => {
    const date = new Date(published_time);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return(
    <TouchableOpacity style={ styles.container } onPress={handleOnPress} >
      <View style={ styles.headerContainer } >

        <View style={ styles.journalistContainer } >
          <Image source={require(`../assets/lasse_claes.jpg`)} style={[ styles.journalistImage, { width: journalistImageSize, height: journalistImageSize }]} />

          <View style={ layout.flexColumn } >
            <Text style={ globalStyles.journalistName } >
              { journalistName }
            </Text>

            <View style={ styles.newsCategoryContainer } >
              <Text style={ styles.newsCategory } >
                { article.category_str }
              </Text>
            </View>

          </View>
        </View>

        <View style={ styles.timeStampContainer }>
          <Text style={ globalStyles.timeStamp } >
            { formatPublishedTime(article.published_time) }
          </Text>
        </View>

      </View>

      <Image source={require(`../assets/thumbnail_1.png`)} resizeMode='cover' style={[ styles.thumbnail, { height: thumbnailHeight }]} />

      <Text style={ globalStyles.newsTitle }>
        { article.title }
      </Text>
    </TouchableOpacity>
  );
}

NewsCard.propTypes = {
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
    backgroundColor: '#F4F4F4',
    marginBottom: '5%',
    padding: '5% 5% 5% 5%',
    borderRadius: 7.5,
    ...layout.flexColumn
  },
  thumbnail: {
    width: '100%', 
    borderRadius: 2.5, 
    marginVertical: '4%'
  },
  timeStampContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    ...layout.flexColumn
  },
  newsCategory: {
    textAlign: 'center', 
    paddingVertical: '0.5%', 
    paddingHorizontal: '2.5%',
    ...globalStyles.newsCategory
  },
  newsCategoryContainer: {
    alignSelf: 'flex-start', 
    backgroundColor: '#434843', 
    borderRadius: 2.5, 
    marginTop: '2.5%'
  },
  journalistContainer: {
    alignItems: 'center',
    ...layout.flexRow
  },
  journalistImage: {
    borderRadius: 50, 
    marginRight: '7.5%'
  },
  headerContainer: {
    justifyContent: 'space-between',
    ...layout.flexRow
  },
  breakingContainer: {
    backgroundColor: 'yellow',
  }
});
