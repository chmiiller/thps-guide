import React, { useEffect, useState, useLayoutEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

import { ATOM_BLUE, ATOM_GRAY, ATOM_YELLOW, GRAY3 } from '../../constants/colors';
import NailedButton from '../../components/Nailed';

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor:ATOM_GRAY,
    },
    webView: {
        backgroundColor: 'transparent',
        margin: 16,
    },
});

const GoalScreen = ({ route, navigation, settings, dispatch }) => {
    const {item} = route.params;
    const [goalTitle, setGoalTitle] = useState(item.title);
    const [goalContent, setGoalContent] = useState(item.data.content);
    const [goalCompleted, setGoalCompleted] = useState(false);
    
    useLayoutEffect(() => {
        navigation.setOptions({
            title: !goalTitle ? 'Goal' : goalTitle,
        });
    }, [navigation, goalTitle]);

    useEffect(() => {
        if (settings && settings.completedGoals) {
            if (settings.completedGoals[item.id]) {
                setGoalCompleted(true);
            } else {
                setGoalCompleted(false);
            }
        }
    }, [ settings ]);

    const tableStyle = `
        * { font-family: -apple-system, BlinkMacSystemFont, sans-serif; color: ${ATOM_YELLOW}; }
        table, th, td {
            border-collapse: collapse; 
            border: 1px solid #ddd; 
            border-collapse: collapse;
            vertical-align: center;
        } 
        td { 
            padding: 4px; 
            font-size: 14px;
        }
    `

    const onNailedButton = () => {
        if (item) {
            if (goalCompleted) {
                dispatch({ type: 'RESET_GOAL', payload: item });
            } else {
                dispatch({ type: 'COMPLETE_GOAL', payload: item });
            }
        }
    }
    
    return (
        <ScrollView style={styles.scrollView} contentContainerStyle={{flexGrow: 1}}>
            <WebView
                originWhitelist={['*']}
                style={styles.webView}
                source={{
                    html: `
                        <!DOCTYPE html>
                        <html>
                            <head><meta name="viewport" content="width=device-width"></head>
                            <style>${tableStyle}</style>
                            <body style="margin: 0; padding: 0;">
                                <div style="height: 600px; width: 100%;">${goalContent}</div>
                            </body>
                        </html>
                    `
                }}
                automaticallyAdjustContentInsets={false}
            />
            <NailedButton onClick={onNailedButton} completed={goalCompleted} />
            <View style={{height: 100}}></View>
        </ScrollView>
    );
}

const mapStateToProps = (state) => {
    return {
        settings: state.progress,
    };
};

export default connect(mapStateToProps)(GoalScreen);
