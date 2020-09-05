import React, { useState } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ATOM_BLUE, ATOM_GRAY, ATOM_YELLOW } from '../../constants/colors';



const GoalHeader = ({ onPress, title }) => {
    return (
        <View>
            <Button onPress={onPress} title={title}></Button>
        </View>
    );
}

export default GoalHeader;