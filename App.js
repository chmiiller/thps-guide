/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react'
import 'localstorage-polyfill'; 

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { ATOM_BLUE, ATOM_GRAY, ATOM_YELLOW } from './constants/colors';

import reduxStore, { persistor } from './reduxStore';

import HomeScreen from './scenes/home';
import CharsScreen from './scenes/chars';
import SearchScreen from './scenes/search';
import ExtrasScreen from './scenes/extras';
import SettingsScreen from './scenes/settings';

const Tab = createBottomTabNavigator();

const App = () => {
	const tabBarOptions = {
		style: {
			backgroundColor: ATOM_GRAY,
			position: 'absolute',
			left: 0,
			bottom: 0,
			right: 0,
			borderTopColor: '#000',
		},
		showLabel: false,
		activeTintColor: ATOM_BLUE,
		inactiveTintColor: ATOM_YELLOW,
	};

	const navigation = () => {
		return (
			<SafeAreaProvider>
				<NavigationContainer>
					<Tab.Navigator
						screenOptions={({ route }) => ({
						tabBarIcon: ({ focused, color, size }) => {
							let iconName;
							let icon;

							if (route.name === 'Home') {
								iconName = focused ? 'home-variant' : 'home-variant-outline';
								icon = <Icon name={iconName} size={size} color={color} />;
							} else if (route.name === 'Characters') {
								iconName = focused ? 'face-woman' : 'face-woman-outline';
								icon = <Icon name={iconName} size={size} color={color} />;
							} else if (route.name === 'Search') {
								iconName = focused ? 'md-search' : 'md-search-outline';
								icon = <Ionicons name={iconName} size={size} color={color} />;
							} else if (route.name === 'Extras') {
								iconName = focused ? 'plus-box' : 'plus-box-outline';
								icon = <Icon name={iconName} size={size} color={color} />;
							} else if (route.name === 'Settings') {
								iconName = focused ? 'wrench' : 'wrench-outline';
								icon = <Icon name={iconName} size={size} color={color} />;
							}
							return icon;
						},
						})}
						tabBarOptions={tabBarOptions}
					>
						<Tab.Screen name="Home" component={HomeScreen} />
						<Tab.Screen name="Characters" component={CharsScreen} />
						<Tab.Screen name="Search" component={SearchScreen} />
						<Tab.Screen name="Extras" component={ExtrasScreen} />
						<Tab.Screen name="Settings" component={SettingsScreen} />
					</Tab.Navigator>
				</NavigationContainer>
			</SafeAreaProvider>
		);
	}

  return (
	<Provider store={reduxStore}>
		<PersistGate loading={null} persistor={persistor}>
			{navigation()}
		</PersistGate>
	</Provider>
  );
};

export default App;
