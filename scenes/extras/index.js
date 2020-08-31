import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ATOM_BLUE, ATOM_GRAY, ATOM_YELLOW } from '../../constants/colors';

const ExtrasScreen = () => {
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
            <Text style={{color: ATOM_YELLOW}}>Extras</Text>
        </View>
        </SafeAreaView>
    );
}

export default ExtrasScreen;