import React, { useState, useLayoutEffect } from 'react';
import { ActivityIndicator, Button, FlatList, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ATOM_BLUE, ATOM_GRAY, ATOM_YELLOW } from '../../../constants/colors';
import ErrorMessage from '../../../components/ErrorMessage';
import { getAvailableGames } from '../../../api/index';

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: ATOM_GRAY,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    container: {
        backgroundColor: ATOM_GRAY,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    flatList: {
        marginTop: 40,
    },
});

const GameSelectScreen = ({ navigation }) => {
    const [loadingGames, setLoadingGames] = useState(true);
    const [withError, setWithError] = useState(false);
    const [games, setGames] = useState([]);

    useLayoutEffect(() => {
        setLoadingGames(true);
        setWithError(false);
        fetchLevels();
    }, []);

    const SelectGameButton = (item) => {
        if (item && item.title) {
            return (
                <Button
                    key={item.id}
                    title={item.title}
                    onPress={() => {
                        console.log(' >>>>>>>>>>>>>>>>>>>>>>>>>>>>> selected game: ' + JSON.stringify(item,null,'    '));
                    }}
                />
            );
        }
    }

    const fetchLevels = async() => {
        const availableGames = await getAvailableGames();
        setLoadingGames(false);
        if (availableGames && availableGames.length) {
            setGames(availableGames);
            setWithError(false);
        } else {
            setWithError(true);
        }
    };

    const renderGamesList = () => {
        if (withError) {
            return ( <ErrorMessage /> );
        }

        if ( loadingGames ) {
            return ( <ActivityIndicator size="large" color={ATOM_YELLOW} /> );
        } else {
            return (
                <FlatList
                    style={{marginTop: 40}}
                    data={games}
                    renderItem={({item}) => SelectGameButton(item)}
                />
            );
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
            <View style={styles.container}>
                {renderGamesList()}
            </View>
        </SafeAreaView>
    );
}

export default GameSelectScreen;
