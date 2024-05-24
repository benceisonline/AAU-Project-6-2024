import React from 'react';
import { View, StyleSheet } from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/Foundation';
import { layout } from '../GlobalStyles';

const PlusIndicator = ({ isActive }) => {
    const triangleColor = isActive ? '#1C4EFF' : '#C1C1C1';

    return (
        <View style={styles.container}>
            <Triangle width={65} height={65} color={triangleColor} rotate={180} />
        </View>
    );
};

const Triangle = ({ width, height, color, rotate }) => {
    return (
        <View style={{
            width: width,
            height: height,
            backgroundColor: color,
            transform: [{ rotate: `${rotate}deg` }],
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
            borderTopRightRadius: 150,
        }}>
            <FontAwesomeIcon name="plus" size={30} color="white" style={styles.innerIcon} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        zIndex: 10,
    },
    innerIcon: {
        zIndex: 5,  
        marginRight: 20,
        marginTop: 15,
    },
});

export default PlusIndicator;
