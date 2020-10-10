import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { ATOM_YELLOW, GRAY5 } from '../../constants/colors';

const LevelCard = ({ item, index, onClick }) => {
    if(!item || !item.id) {
        console.log(' >>>>>>>>>>>>>>>>>>>>>>>>>>>>> Level not found');
        return <View />
    }
    const first = (index === 0);
    return (
        <Pressable
            key={`level_card_${item.id}`}
            style={({ pressed }) => cardStyle({ pressed, first })}
            onPress={() => onClick(item)}
        >
            <Image
                style={styles.cardImage}
                source={{
                    uri: item.image,
                }}
            />
            <View style={styles.cardTextContainer}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.subtitle}>{`8/10 Goals`}</Text>
            </View>
        </Pressable>
    );
}

const cardStyle = ({ pressed, first }) => {
    let newStyle = styles.card;
    if (first) {
        newStyle = { ...newStyle, marginTop: 32 }
    }
    return (!pressed) ? newStyle : { ...newStyle, opacity: 0.6 };
};

const styles = StyleSheet.create({
    card: {
        height: 110,
        borderRadius: 4,
        backgroundColor: GRAY5,
        flexDirection: 'row',
        marginHorizontal: 24,
        marginTop: 16,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: { height: 1 },
        shadowOpacity: 0.45,
        shadowRadius: 2,
        elevation: 3,
    },
    cardImage: {
        height: '100%',
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 4,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 0,
    },
    cardTextContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        padding: 8,
        backgroundColor: GRAY5,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        color: ATOM_YELLOW,
        fontWeight: '600',
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 16,
        color: ATOM_YELLOW,
        fontWeight: 'normal',
        textAlign: 'center',
        marginTop: 8,
    },
});

export default LevelCard;