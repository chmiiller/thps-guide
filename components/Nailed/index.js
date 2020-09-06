import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ATOM_BLUE, ATOM_GRAY, ATOM_YELLOW, GRAY3 } from '../../constants/colors';

const styles = StyleSheet.create({
    nailedButton: {
        alignItems: 'center',
        marginVertical: 12,
        marginHorizontal: 16,
        borderRadius: 10,
        borderColor: ATOM_YELLOW,
        borderWidth: 1,
        height: 40,
        padding: 10,
    },
    nailedText: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold',
        color: ATOM_YELLOW
    },
    nailedButtonSelected: {
        backgroundColor: ATOM_YELLOW,
        alignItems: 'center',
        marginVertical: 12,
        marginHorizontal: 16,
        borderRadius: 10,
        height: 40,
        padding: 10,
    },
    nailedTextSelected: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold',
        color: ATOM_GRAY
    },
});

const NailedButton = ({ onClick, completed = false }) => {
    const onNailedClick = () => {
        onClick();
    };

    return (
        <View>
            <TouchableOpacity onPress={onNailedClick} style={completed ? styles.nailedButtonSelected : styles.nailedButton} >
                <Text style={completed ? styles.nailedTextSelected : styles.nailedText}>NAILED2 IT</Text>
            </TouchableOpacity>
        </View>
    );
}

export default NailedButton;