import React, { useEffect, useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
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
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    extraSpacingView: {
        height: 100,
    },
});

const LevelScreen = ({ route, navigation, settings }) => {
    const [screenTitle, setScreenTitle] = useState(route.params.title);
    const [goals, setGoals] = useState([]);
    const [loadingGoals, setLoadingGoals] = useState(true);
    const [withError, setWithError] = useState(false);
    const [stateCompleted, setStateCompleted] = useState({});
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

    useEffect(() => {
        setStateCompleted(settings.completedGoals);
    }, [ settings ]);

    const fetchGoals = async(levelId) => {
        const allGoalsFromLevel = await getGoalsByLevelId(levelId);
        setLoadingGoals(false);
        if (allGoalsFromLevel && allGoalsFromLevel.length) {
            setWithError(false);
            setGoals(allGoalsFromLevel);
        } else {
            setWithError(true);
        }
    };

    const openGoalDetails = goal => {
        if (goal && goal.data && goal.data.content) {
            navigation.navigate('GoalScreen', { item: goal });
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
                            completed={stateCompleted[childGoal.id]}
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

const mapStateToProps = (state) => {
    return {
        settings: state.progress,
    };
};


export default connect(mapStateToProps)(LevelScreen);