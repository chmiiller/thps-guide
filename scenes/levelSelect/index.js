import React, { useEffect, useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, Button, FlatList, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ATOM_BLUE, ATOM_GRAY, ATOM_YELLOW } from '../../constants/colors';
import ErrorMessage from '../../components/ErrorMessage';
import { getLevelsByGameId } from '../../api/index';

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

const LevelSelectScreen = ({ navigation, settings }) => {
    const [loadingLevels, setLoadingLevels] = useState(true);
    const [withError, setWithError] = useState(false);
    const [levels, setGameLevels] = useState([]);
    const [currentGame, setCurrentGame] = useState(null);

    useLayoutEffect(() => {
        setLoadingLevels(true);
        setWithError(false);

        if (settings && settings.currentGame) {
            setCurrentGame(settings.currentGame);
        }
    }, [settings]);

    useEffect(() => {
        if (currentGame && currentGame.id) {
            fetchLevels(currentGame.id);
        }
    }, [ currentGame ]);

    const OpenButton = (item) => {
        if (item && item.name) {
            return (
                <Button
                    key={item.id}
                    title={item.name}
                    onPress={() => {
                        navigation.navigate('Level', {
                            itemId: item.id,
                            title: item.name,
                        });
                    }}
                />
            );
        }
    }

    const fetchLevels = async(gameId) => {
        const allLevelsFromSecondGame = await getLevelsByGameId(gameId);
        if (allLevelsFromSecondGame && allLevelsFromSecondGame.length) {
            setGameLevels(allLevelsFromSecondGame);
            setLoadingLevels(false);
            setWithError(false);
        } else {
            setWithError(true);
        }
    };

    const renderLevelList = () => {
        if (withError) {
            return ( <ErrorMessage /> );
        }

        if ( loadingLevels ) {
            return ( <ActivityIndicator size="large" color={ATOM_YELLOW} /> );
        } else {
            return (
                <FlatList
                    style={styles.flatList}
                    data={levels}
                    renderItem={({item}) => OpenButton(item)}
                    keyExtractor={item => `level_${item.id}`}
                />
            );
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
            <View style={styles.container}>
                {renderLevelList()}
            </View>
        </SafeAreaView>
    );
}

const mapStateToProps = (state) => {
    return {
        settings: state.settings,
    };
};
export default connect(mapStateToProps)(LevelSelectScreen);
