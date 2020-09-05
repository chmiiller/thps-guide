import React from 'react';
import { StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import { ATOM_BLUE, ATOM_GRAY, ATOM_YELLOW } from '../../constants/colors';
import SettingsHomeScreen from './home';
import GameSelectionScreen from './gameSelection';
import AboutScreen from './about';
import LibsScreen from './libs';
import DisclaimerScreen from './Disclaimer';

const Stack = createStackNavigator();

const Settings = () => {
    return (
        <Stack.Navigator initialRouteName="SettingsHomeScreen" screenOptions={headerStyle}>
            <Stack.Screen name="SettingsHomeScreen" component={SettingsHomeScreen} options={ {title: 'Settings'} }/>
            <Stack.Screen name="GameSelectionScreen" component={GameSelectionScreen} options={ {title: 'Game Select'} }/>
            <Stack.Screen name="AboutScreen" component={AboutScreen} options={ {title: 'About'} }/>
            <Stack.Screen name="LibsScreen" component={LibsScreen} options={ {title: 'Frameworks and libraries'} }/>
            <Stack.Screen name="DisclaimerScreen" component={DisclaimerScreen} options={ {title: 'Disclaimer source'} }/>
        </Stack.Navigator>
    );
}

const headerStyle = {
    headerStyle: {
        backgroundColor: ATOM_GRAY,
        shadowColor: '#000', // or 'transparent'
    },
    headerTintColor: ATOM_YELLOW,
    headerTitleStyle: {
        fontWeight: 'bold',
    },
    headerBackTitleVisible: false,
};

export default Settings;