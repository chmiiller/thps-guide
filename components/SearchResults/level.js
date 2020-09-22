import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ATOM_GRAY, ATOM_YELLOW } from '../../constants/colors';

const styles = StyleSheet.create({
    flatListItemContainer: {
        padding: 8,
        flexDirection: 'row',
        backgroundColor: ATOM_GRAY,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

const LevelResult = ({ item, onClick }) => {
    const onNailedClick = () => {
        onClick(item);
    };

    return (
        <View style={styles.flatListItemContainer}>
            <Button
                color={ATOM_YELLOW}
                key={`settings_${item.id}`}
                title={item.name}
                onPress={onNailedClick}
            />
            <Icon
                name={'chevron-right'}
                size={25}
                color={ATOM_YELLOW}
            />
        </View>
    );
}

export default LevelResult;