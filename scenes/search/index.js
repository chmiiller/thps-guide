import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ATOM_BLUE, ATOM_GRAY, ATOM_YELLOW } from '../../constants/colors';
import SearchComponent from './searchComponent';
import LevelScreen from '../level';
import GoalScreen from '../goals';

const Stack = createStackNavigator();

const SearchScreen = () => {
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
    
    return (
        <Stack.Navigator initialRouteName="Search" screenOptions={headerStyle}>
            <Stack.Screen name="Search" options={{headerShown: false}}component={SearchComponent} />
            <Stack.Screen name="Level" component={LevelScreen} options={ {title: 'The Hangar'} }/>
            <Stack.Screen name="GoalScreen" component={GoalScreen} />
        </Stack.Navigator>
    );
}

export default SearchScreen;