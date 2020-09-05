import React, { useState, useLayoutEffect } from 'react';
import { ActivityIndicator, Button, FlatList, Linking, StyleSheet, Text, View } from 'react-native';

import { ATOM_BLUE, ATOM_GRAY, ATOM_YELLOW } from '../../../constants/colors';
import { APP_VERSION } from '../../../constants/strings';
import ErrorMessage from '../../../components/ErrorMessage';
import { getSettings } from '../../../api/index';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

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
    flatListItemContainer: {
        padding: 8,
        flexDirection: 'row',
        backgroundColor: ATOM_GRAY,
        justifyContent: 'space-between',
        alignItems: 'center',
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
            return (
                <View style={styles.flatListItemContainer}>
                    <Button
                        color={ATOM_YELLOW}
                        key={`settings_${item.id}`}
                        title={item.title}
                        onPress={() => settingsOptionClick(item)}
                    />
                    <Icon
                        name={(item.type === 'coffee') ? 'heart-outline' : 'chevron-right'}
                        size={(item.type === 'coffee') ? 22 : 25}
                        color={ATOM_YELLOW}
                    />
                </View>
            );
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
