import React from 'react'; 
import { StyleSheet, View, Text, Image, Dimensions } from 'react-native';
import { layout, globalStyles } from '../GlobalStyles';
import PropTypes from 'prop-types';

NewsCard.propTypes = {
  journalist: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  news: PropTypes.shape({
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    breaking: PropTypes.bool.isRequired,
  }).isRequired,
};

export default function NewsCard({ journalist, news }) {
  const { height } = Dimensions.get('window');

  const thumbnailHeight = height * 0.2;
  const journalistImageSize = height * 0.05;
  
  return(
    <View style={[styles.container, news.breaking ? styles.breakingContainer : null]} >

      <View style={ styles.headerContainer } >

        <View style={ styles.journalistContainer } >
          <Image source={require(`../assets/lasse_claes.jpg`)} style={[ styles.journalistImage, { width: journalistImageSize, height: journalistImageSize }]} />

          <View style={ layout.flexColumn } >
            <Text style={ globalStyles.journalistName } >
              { journalist.name }
            </Text>

            <View style={ styles.newsCategoryContainer } >
              <Text style={ styles.newsCategory } >
                { news.category }
              </Text>
            </View>

          </View>
        </View>

        <View style={ styles.timeStampContainer }>
          <Text style={ globalStyles.timeStamp } >
            { news.timestamp }
          </Text>
        </View>

      </View>

      <Image source={require(`../assets/thumbnail_1.png`)} resizeMode='cover' style={[ styles.thumbnail, { height: thumbnailHeight }]} />

      <Text style={ globalStyles.newsTitle }>
        { news.title }
      </Text>
    </View>
  );
}

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