import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto'; // Adjust the import path based on the icon set you prefer
import FontAwesomeIcon from 'react-native-vector-icons/Foundation';

const PlusIndicator = ({ isActive }) => {
    const triangleColor = isActive ? '#1C4EFF' : '#C1C1C1';

    return (
        <View style={styles.container}>
            {/* Outer Icon */}
            <Icon name="caret-down" size={88} color={triangleColor} style={styles.outerIcon} />
            
            {/* Inner Icon (White Plus) */}
            <FontAwesomeIcon name="plus" size={22} color="white" style={styles.innerIcon} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: -30,
        position: 'absolute',
        top: 0,
        right: 0,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        zIndex: 9999,
    },
    outerIcon: {
        transform: [{ rotate: '-135deg' }],
    },
    innerIcon: {
        position: 'absolute',
        top: 35,
        right: 38,
    },
});

export default PlusIndicator;
