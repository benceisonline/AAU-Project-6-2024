import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto'; // Adjust the import path based on the icon set you prefer
import FontAwesomeIcon from 'react-native-vector-icons/Foundation'

const PlusIndicator = ({ isActive }) => {
    const triangleColor = isActive ? '#1C4EFF' : '#C1C1C1';

    return (
        <View style={{ position: 'absolute', top: 10, right: -37 }}>
            {/* Outer Icon */}
            <Icon name="caret-down" size={100} color={triangleColor} style={{ transform: [{ rotate: '-135deg' }] }} />
            
            {/* Inner Icon (White Plus) */}
            <FontAwesomeIcon name="plus" size={22} color="white" style={{ position: 'absolute', top: 38, right: 48 }} />
        </View>
    );
};

export default PlusIndicator;
