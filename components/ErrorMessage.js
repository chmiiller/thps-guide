import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ATOM_YELLOW } from '../constants/colors';

const DEFAULT_MESSAGE = 'Oops, something went wrong';
const DEFAULT_ICON = 'emoticon-dead-outline';
const DEFAULT_COLOR = ATOM_YELLOW;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        marginTop: 20,
    },
    message: {
        fontSize: 16,
        color: DEFAULT_COLOR,
    },
});

const ErrorMessage = ({ message, icon, color }) => {
    styles.message.color = color || DEFAULT_COLOR;

    return ( 
        <View style={styles.container}>
            <Text style={styles.message}>
                {message || DEFAULT_MESSAGE}
            </Text>
            <Icon
                style={styles.icon} 
                name={icon || DEFAULT_ICON} 
                size={30} 
                color={color || DEFAULT_COLOR}
            />
        </View>
    );
}

export default ErrorMessage;

