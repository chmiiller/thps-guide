import React from 'react';
import { StatusBar, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ATOM_GRAY, ATOM_GRAY_LIGHT, ATOM_YELLOW } from '../../constants/colors';
import { SEARCH_PLACEHOLDER } from '../../constants/strings';

const styles = StyleSheet.create({
    barContainer: {
        backgroundColor: ATOM_GRAY,
        padding: 8,
        borderColor: ATOM_YELLOW,
        borderBottomWidth: 0.5,
        margin: 8,
        flexDirection: 'row', 
        alignItems: 'center', 
        height: 50,
    },
    textInput: {
        flex: 1,
        fontSize: 18,
        color: ATOM_YELLOW,
        paddingTop: 0,
        paddingBottom: 0,
    },
});

const SearchScreen = () => {
    const [value, setSearchValue] = React.useState('');
    const textInputRef = React.createRef();

    const onCancelPress = () => {
        
        setSearchValue('');
        textInputRef.current.blur();
    };

    const onChangeText = (text) => {
        setSearchValue(text);
    };

    const onSubmitSearch = () => {
        console.log(' >>>>>>>>>>>>>>>>>>>>>>>>>>>>> send search with value: ' + value);
    };

    const buttonExtraMargin = { top: 10, bottom: 10, left: 10, right: 10 };

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
            <View style={styles.barContainer}>
                <TextInput
                    ref={textInputRef}
                    selectionColor={ATOM_YELLOW}
                    placeholderTextColor={ATOM_GRAY_LIGHT}
                    onSubmitEditing={onSubmitSearch}
                    placeholder={SEARCH_PLACEHOLDER}
                    style={[styles.textInput]}
                    value={value}
                    onChangeText={onChangeText}
                    keyboardAppearance={'dark'}
                />
                <TouchableOpacity
                    onPress={onCancelPress}
                    hitSlop={buttonExtraMargin}
                >
                    {(value && value.length) ? (
                        <Icon
                            name={'close'}
                            size={24}
                            color={ATOM_YELLOW}
                        />
                    ) : (
                        <Icon
                            name={'magnify'}
                            size={24}
                            color={ATOM_YELLOW}
                        />
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

export default SearchScreen;
