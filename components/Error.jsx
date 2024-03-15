import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { errorScreen, layout } from '../GlobalStyles';
import PropTypes from 'prop-types';
import ACTION from '../constants/ErrorActions';

const { height } = Dimensions.get('window');

export default function Error({ errorText, action }) {
  const navigation = useNavigation();

  const handleAction = (action) => {
    switch (action) {
      case ACTION.REFRESH:
        return(
          <TouchableOpacity style={[errorScreen.button, layout.centeredColumn]} onPress={() => navigation.dispatch(StackActions.replace('NewsFeed'))} >
            <Ionicons name="refresh" size={height * 0.04} color="black" />
            <Text style={errorScreen.errorText} >
              Prøv igen
            </Text>
          </TouchableOpacity>
        );
      case ACTION.BACK:
          return( 
            <TouchableOpacity style={layout.centeredRow} onPress={() => navigation.goBack()} >
              <Ionicons name="arrow-back" size={height * 0.04} color="black" />
              <Text style={errorScreen.errorText} >
                Gå tilbage
              </Text>
            </TouchableOpacity>
          );
      default:
        break;
    }
  }

  return(
    <View style={errorScreen.container} >
      <Text style={errorScreen.errorText} >
        { errorText }
      </Text>
      { handleAction(action) }
    </View>
  );
}

PropTypes.propTypes = {
  errorText: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired
}