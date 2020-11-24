import React, { useState, createRef } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ATOM_GRAY, ATOM_GRAY_LIGHT, ATOM_YELLOW } from '../../constants/colors';
import { SEARCH_PLACEHOLDER, SEARCH_NOT_FOUND } from '../../constants/strings';
import LevelCard from '../../components/LevelCard';
import ErrorMessage from '../../components/ErrorMessage';
import { searchLevel } from '../../api';

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
    content: {
        backgroundColor: 'transparent', 
        width: '100%',
        height: 300,
        margin: 8,
        padding: 8,
    },
    flatList: {
        marginTop: 0,
    },
    
});

const SearchScreen = ({ navigation }) => {
    const [value, setSearchValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [withError, setWithError] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const textInputRef = createRef();

    const onCancelPress = () => {
        setSearchValue('');
        setSearchResults([]);
        setIsLoading(false);
        setWithError(false);
        textInputRef.current.blur();
    };

    const onChangeText = (text) => {
        setSearchValue(text);
    };

    const onSubmitSearch = () => {
        if (value) {
            setIsLoading(true);
            callSearchApi(value);
        }
    };

    const callSearchApi = async(term) => {
        const result = await searchLevel(term);
        setIsLoading(false);
        if (result && result.length) {
            setWithError(false);
            setSearchResults(result);
        } else {
            setWithError(true);
        }
    };

    const buttonExtraMargin = { top: 10, bottom: 10, left: 10, right: 10 };

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

    const renderSearchContent = () => {
        if (withError) {
            return ( <ErrorMessage message={SEARCH_NOT_FOUND} icon={'magnify'} /> );
        }

        if (searchResults.length === 0) {
            return ( <View/> );
        }

        if ( isLoading ) {
            return ( <ActivityIndicator size="large" color={ATOM_YELLOW} /> );
        } else {
            return (
                <FlatList
                    style={styles.flatList}
                    data={searchResults}
                    renderItem={({item, index}) => LevelButton({item, index})}
                    keyExtractor={item => `result_${item.id}`}
                />
            )
        }
    };

    return (
        <SafeAreaView
            style={{
                backgroundColor: ATOM_GRAY,
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}
        >
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
            <View style={styles.content}>
                {renderSearchContent()}
            </View>
            
        </SafeAreaView>
    );
}

export default SearchScreen;
