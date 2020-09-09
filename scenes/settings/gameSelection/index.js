import React, { useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, Button, FlatList, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ATOM_BLUE, ATOM_GRAY, ATOM_YELLOW } from '../../../constants/colors';
import ErrorMessage from '../../../components/ErrorMessage';
import { getAvailableGames } from '../../../api/index';
import Goal from '../../../components/Goal';

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

const GameSelectScreen = ({ navigation, settings, dispatch }) => {
    const [loadingGames, setLoadingGames] = useState(true);
    const [withError, setWithError] = useState(false);
    const [games, setGames] = useState([]);
    const [selectedGame, setSelectedGame] = useState(null);

    useLayoutEffect(() => {
        setLoadingGames(true);
        setWithError(false);
        if (settings && settings.currentGame) {
            setSelectedGame(settings.currentGame.id);
            fetchAvailableGames();
        }
    }, [settings]);

    const updateGame = (game) => {
        dispatch({
            type: 'SELECT_GAME',
            payload: game,
        });
    }

    const SelectGameButton = (item) => {
        if (item && item.title) {
            return (
                <Goal
                    key={item.id}
                    completed={item.id === selectedGame}
                    item={item}
                    onClick={() => updateGame(item)}
                />
            );
        }
    }

    const fetchAvailableGames = async() => {
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
                    keyExtractor={item => `games_${item.id}`}
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

const mapStateToProps = (state) => {
    return {
        settings: state.settings,
    };
};

export default connect(mapStateToProps)(GameSelectScreen);
