import React, { useState } from 'react'; 
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { layout, globalStyles } from '../GlobalStyles';
import PlusIndicator from '../components/PlusIndicator';

const SubViewTitles = [
  {
    id: 1,
    title: 'Til dig'
  },
  {
    id: 2,
    title: 'Følger'
  },
  {
    id: 3,
    title: 'Alle nyheder'
  }
]

export default function NewsHeader({ onPressedSubView }) {
  const { height } = Dimensions.get('window');
  const [activeSubView, setActiveSubView]  = useState(1);

  const logoHeight = height * 0.05;

  const handleOnPress = (id) => {
    if (activeSubView === id) return;

    setActiveSubView(id);
    onPressedSubView(id);
  }

  const SubViews = () => {
    return (
      <>
        {SubViewTitles.map((item) => (
          <TouchableOpacity key={ item.id } onPress={() => handleOnPress( item.id )} style={ styles.subView } >
            <Text style={[globalStyles.subView, activeSubView === item.id ? styles.activeSubView : null]}>
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </>
    );
  }

  return(
    <View style={ styles.headerContainer } >

      <View style={ styles.headlineContainer } >
        <View style={ styles.headlineLogo } >
          <Image source={require(`../assets/eb_logo.png`)} resizeMode='contain' style={{ width: logoHeight, height: logoHeight }} />
          <Text style={ styles.headline } >
            Nyheder
          </Text>
        </View>
          
        <PlusIndicator isActive={true} />
      </View>

      <View style={ styles.subViewContainer } >
        <SubViews />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingBottom: '2.5%',
    top: 0,
    backgroundColor: '#FCFCFC',
    ...layout.flexColumn
  },
  headlineContainer: {
    alignItems: 'center',
    marginVertical: '2%',
    justifyContent: 'space-between',
    ...layout.flexRow
  },
  headlineLogo: {
    paddingHorizontal: '5%',
    ...layout.flexRow
  },
  headline: {
    marginLeft: '2.5%',
    ...globalStyles.headline
  },
  subViewContainer: {
    paddingHorizontal: '5%',
    ...layout.flexRow
  },
  subView: {
    marginRight: '7.5%',
    alignItems: 'center',
    marginVertical: '2%'
  },
  activeSubView: {
    color: '#000',
    textDecorationLine: 'underline',
    fontFamily: 'InterTight-Bold',
  }
});