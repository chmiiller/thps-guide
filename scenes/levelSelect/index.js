import React, { useEffect, useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { ActivityIndicator, Button, FlatList, StatusBar, StyleSheet, View } from 'react-native';

import { ATOM_BLUE, ATOM_GRAY, ATOM_YELLOW } from '../../constants/colors';
import ErrorMessage from '../../components/ErrorMessage';
import { getLevelsByGameId } from '../../api/index';
import LevelCard from '../../components/LevelCard';

const styles = StyleSheet.create({
    container: {
        backgroundColor: ATOM_GRAY,
        flex: 1,
        flexDirection: 'column',
    },
    flatList: {
        marginTop: 0,
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

    const LevelButton = ({item, index}) => (
        <LevelCard
            item={item}
            index={index}
            onClick={() => {
                navigation.navigate('Level', {
                    itemId: item.id,
                    title: item.name,
                });
            }}
        />
    );

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
                    contentContainerStyle={{paddingBottom: 96}}
                    data={levels}
                    renderItem={({item, index}) => LevelButton({item, index})}
                    keyExtractor={item => `level_${item.id}`}
                />
            );
        }
    };

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
            <View style={styles.container}>
                {renderLevelList()}
            </View>
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        settings: state.settings,
    };
};
export default connect(mapStateToProps)(LevelSelectScreen);
