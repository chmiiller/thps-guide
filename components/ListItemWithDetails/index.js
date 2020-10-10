import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ATOM_GRAY, ATOM_YELLOW } from '../../constants/colors';

const styles = StyleSheet.create({
    flatListItemContainer: {
        height: 56,
        padding: 16,
        flexDirection: 'row',
        backgroundColor: ATOM_GRAY,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    flatListItemLabel: {
        color: ATOM_YELLOW,
        fontSize: 16,
        fontWeight: '500',
    },
});

const ListItemWithDetails = ({ item, onClick, icon }) => {
    return (
        <TouchableOpacity
            key={`settings_${item.id}`}
            style={styles.flatListItemContainer}
            onPress={() => onClick(item)}
        >
            <Text style={styles.flatListItemLabel}>
                {item.title}
            </Text>
            <Icon
                name={(icon && icon.name) ? icon.name : 'chevron-right'}
                size={(icon && icon.size) ? icon.size : 25}
                color={(icon && icon.color) ? icon.color : ATOM_YELLOW}
            />
        </TouchableOpacity>
    );
}

export default ListItemWithDetails;