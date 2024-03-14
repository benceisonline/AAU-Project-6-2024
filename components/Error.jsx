import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { errorScreen, layout } from '../GlobalStyles';
import PropTypes from 'prop-types';

const { height } = Dimensions.get('window');

export default function Error({ errorText }) {
  const navigation = useNavigation();

  return(
    <View style={errorScreen.container} >
      <Text style={errorScreen.errorText} >
        { errorText }
      </Text>
      <TouchableOpacity style={[errorScreen.button, layout.centeredRow]} onPress={() => navigation.goBack()} >
        <Ionicons name="arrow-back" size={height * 0.04} color="black" />
        <Text style={errorScreen.errorText} >
          Go back
        </Text>
      </TouchableOpacity>
    </View>
  );
}

PropTypes.propTypes = {
  errorText: PropTypes.string.isRequired
}