import React, { useState, useLayoutEffect } from 'react';
import { ActivityIndicator, Button, FlatList, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ATOM_BLUE, ATOM_GRAY, ATOM_YELLOW } from '../../constants/colors';
import ErrorMessage from '../../components/ErrorMessage';
import { getLevelsByGameId } from '../../api/index';

const LevelSelectScreen = ({ navigation }) => {
    const [loadingLevels, setLoadingLevels] = useState(true);
    const [withError, setWithError] = useState(false);
    const [levels, setGameLevels] = useState([]);

    useLayoutEffect(() => {
        setLoadingLevels(true);
        setWithError(false);
        fetchLevels();
    }, []);

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

    const fetchLevels = async() => {
        const allLevelsFromSecondGame = await getLevelsByGameId(2);
        if (allLevelsFromSecondGame && allLevelsFromSecondGame.length) {
            setTimeout(() => {
                setGameLevels(allLevelsFromSecondGame);
                setLoadingLevels(false);
                setWithError(false);
            }, 1000);
            
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
                    style={{marginTop: 40}}
                    data={levels}
                    renderItem={({item}) => OpenButton(item)}
                />
            );
        }
    };

    const screenOptions = { backgroundColor: ATOM_GRAY, flex: 1, justifyContent: 'center', alignItems: 'center' };
    return (
        <SafeAreaView
            style={{
                backgroundColor: ATOM_GRAY,
                flex: 1,
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
        <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
        <View style={screenOptions}>
            {renderLevelList()}
        </View>
        </SafeAreaView>
    );
}

export default LevelSelectScreen;
