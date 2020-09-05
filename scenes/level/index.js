import React, { useState, useLayoutEffect } from 'react';
import { ActivityIndicator, ScrollView, StatusBar, StyleSheet, View, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ATOM_BLUE, ATOM_GRAY, ATOM_YELLOW } from '../../constants/colors';
import ErrorMessage from '../../components/ErrorMessage';
import Goal from '../../components/Goal';

import { getGoalsByLevelId } from '../../api/index';

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: ATOM_GRAY,
        flex: 1,
        paddingHorizontal: 8,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'space-between'
    },
    extraSpacingView: {
        height: 100,
    },
});

const LevelScreen = ({ route, navigation }) => {
    const [screenTitle, setScreenTitle] = useState(route.params.title);
    const [goals, setGoals] = useState([]);
    const [loadingGoals, setLoadingGoals] = useState(true);
    const [withError, setWithError] = useState(false);
    const levelId = route.params.itemId;
    
    useLayoutEffect(() => {
        setLoadingGoals(true);
        setWithError(false);
        navigation.setOptions({
            title: !screenTitle ? 'Level' : screenTitle,
        });
        if (levelId) {
            fetchGoals(levelId);
        }
    }, [navigation, screenTitle]);

    const fetchGoals = async(levelId) => {
        const allGoalsFromLevel = await getGoalsByLevelId(levelId);
        if (allGoalsFromLevel && allGoalsFromLevel.length) {
            setTimeout(() => {
                setLoadingGoals(false);
                setWithError(false);
                setGoals(allGoalsFromLevel);
            }, 1000);
        }
    };

    const openGoalDetails = goal => {
        if (goal && goal.data && goal.data.content) {
            navigation.navigate('GoalScreen', {
                itemId: goal.id,
                title: goal.title,
                content: goal.data.content,
            });
        }
    };

    const renderGoalsList = () => {
        if (withError) {
            return ( <ErrorMessage /> );
        }

        if ( loadingGoals ) {
            return ( <ActivityIndicator size="large" color={ATOM_YELLOW} /> );
        } else {
            return (
                <>
                    { goals.map(childGoal => (
                        <Goal
                            key={childGoal.id}
                            item={childGoal}
                            onClick={() => openGoalDetails(childGoal)}
                        />
                    )) }
                    <View style={styles.extraSpacingView}></View>
                </>
            );
        }
    };
    
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="light-content" backgroundColor="#6a51ae" />
            <ScrollView contentContainerStyle={styles.scrollView}>
                {renderGoalsList()}
            </ScrollView>
        </SafeAreaView>
    );
}

export default LevelScreen;