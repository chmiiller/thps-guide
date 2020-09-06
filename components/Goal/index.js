import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ATOM_BLUE, ATOM_GRAY, ATOM_YELLOW, GRAY3 } from '../../constants/colors';

const styles = StyleSheet.create({
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 12,
        marginHorizontal: 16,
        backgroundColor: GRAY3,
        borderRadius: 10,
        height: 40,
    },
    headerText: {
        fontSize: 16,
        padding: 10,
        textAlign: 'left',
        fontWeight: 'bold',
        color: ATOM_YELLOW
    },
    headerCheckContainer: {
        width: 30,
        height: 30,
        backgroundColor: ATOM_GRAY,
        borderColor: ATOM_YELLOW,
        borderWidth: 2,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight:  1,
    },
});

const Goal = ({ item, onClick, completed = false }) => {
    const toggleCollapsed = () => {
        onClick(item);
    };

    return (
        <View>
            <TouchableOpacity onPress={toggleCollapsed} style={styles.headerView}>
                <Text style={styles.headerText}>
                    {item.title}
                </Text>
                <View style={{...styles.headerCheckContainer, opacity: completed ? 1 : 0.5}}>
                    <Icon name={'check-bold'} size={20} color={completed ? ATOM_BLUE : ATOM_YELLOW} />
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default Goal;