import React, { useState, useLayoutEffect } from 'react';
import { ActivityIndicator, Button, FlatList, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ATOM_BLUE, ATOM_GRAY, ATOM_YELLOW } from '../../../constants/colors';
import { APP_VERSION } from '../../../constants/strings';
import ErrorMessage from '../../../components/ErrorMessage';
import ListItemWithDetails from '../../../components/ListItemWithDetails';
import { getSettings } from '../../../api/index';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: ATOM_GRAY,
        flexDirection: 'column',
        
    },
    flatList: {
        marginTop: 0,
    },
    flatListContainer: {
        flex: 4,
    },
    flatList: {
        width: '100%',
    },
    versionContainer: {
        flex: 1,
        backgroundColor: ATOM_GRAY,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    versionText: {
        color: ATOM_YELLOW,
    },
});

const SettingsHomeScreen = ({ navigation }) => {
    const [loadingSettings, setLoadingSettings] = useState(true);
    const [withError, setWithError] = useState(false);
    const [settingsItems, setSettingsItems] = useState([]);

    useLayoutEffect(() => {
        setLoadingSettings(true);
        setWithError(false);
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        const settingsFromDb = await getSettings();
        setLoadingSettings(false);
        // Manually manage settings options from DB. If their names don't match they're not displayed
        const mappedSettings = settingsFromDb.map((option) => {
            switch (option.type) {
                case 'gameSelection':
                    return {...option, key: option.id, screen: 'GameSelectionScreen'};
                case 'about':
                    return {...option, key: option.id, screen: 'AboutScreen'};
                case 'libs':
                    return {...option, key: option.id, screen: 'LibsScreen'};
                case 'disclaimer':
                    return {...option, key: option.id, screen: 'DisclaimerScreen'};
                case 'coffee':
                    return {...option, key: option.id};
                default:
                    return {key: option.id};
            }
        });
        setSettingsItems(mappedSettings);
        if (settingsFromDb && settingsFromDb.length) {
            setWithError(false);
        } else {
            setWithError(true);
        }
    };

    const settingsOptionClick = (item) => {
        if (item.type === 'coffee' && item.content) {
            openCoffeeLink(item.content);
            return;
        }
        navigation.navigate(item.screen, {item});
    };

    const openCoffeeLink = async(url) => {
        await Linking.openURL(url);
    };

    const SettingsOption = (item) => {
        if (item && item.title) {
            const icon = (item.type === 'coffee') ? {name: 'heart-outline', size: 22} : null;
            return (<ListItemWithDetails
                item={item}
                onClick={() => settingsOptionClick(item)}
                icon={icon}
            />);
        }
    }

    const renderSettingsOptions = () => {
        if (withError) {
            return ( <ErrorMessage /> );
        }

        if ( loadingSettings ) {
            return ( <ActivityIndicator size="large" color={ATOM_YELLOW} /> );
        } else {
            return (
                <View style={styles.flatListContainer}>
                    <FlatList
                        style={styles.flatList}
                        data={settingsItems}
                        renderItem={({item}) => SettingsOption(item)}
                        keyExtractor={item => `settings_${item.id}`}
                    />
                </View>
            );
        }
    };

    return (
        <View style={styles.container}>
            {renderSettingsOptions()}
            <View style={styles.versionContainer}>
                <Text style={styles.versionText}>{APP_VERSION}</Text>
            </View>
        </View>
    );
};

export default SettingsHomeScreen;
