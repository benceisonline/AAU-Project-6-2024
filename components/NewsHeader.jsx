import React, { useState } from 'react'; 
import { StyleSheet, View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import { layout, globalStyles } from '../GlobalStyles';

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
          <TouchableOpacity key={ item.id } onPress={() => handleOnPress( item.id )} style={ styles.subViewContainer } >
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
        <Image source={require(`../assets/eb_logo.png`)} resizeMode='contain' style={{ width: logoHeight, height: logoHeight }} />
        <Text style={ styles.headline } >
          Nyheder
        </Text>
      </View>

      <View style={ styles.headlineContainer } >
        <SubViews />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: '5%',
    paddingBottom: '2.5%',
    top: 0,
    backgroundColor: '#FCFCFC',
    ...layout.flexColumn
  },
  headlineContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginVertical: '2%',
    ...layout.flexRow
  },
  headline: {
    marginLeft: '2.5%',
    ...globalStyles.headline
  },
  subViewContainer: {
    marginRight: '7.5%'
  },
  activeSubView: {
    color: '#000',
    textDecorationLine: 'underline',
  },
});