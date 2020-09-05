import React, { useState, useLayoutEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

import { ATOM_BLUE, ATOM_GRAY, ATOM_YELLOW, GRAY3 } from '../../constants/colors';

const styles = StyleSheet.create({
    nailedButton: {
        alignItems: 'center',
        marginVertical: 12,
        marginHorizontal: 16,
        borderRadius: 10,
        borderColor: ATOM_YELLOW,
        borderWidth: 1,
        height: 40,
        padding: 10,
    },
    nailedText: {
        fontSize: 14,
        textAlign: 'center',
        fontWeight: 'bold',
        color: ATOM_YELLOW
    },
});

const GoalScreen = ({ route, navigation }) => {
    const [goalTitle, setGoalTitle] = useState(route.params.title);
    const [goalContent, setGoalContent] = useState(route.params.content);
    
    useLayoutEffect(() => {
        navigation.setOptions({
            title: !goalTitle ? 'Goal' : goalTitle,
        });
    }, [navigation, goalTitle]);

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

    return (
        <ScrollView
            style={{
                backgroundColor:ATOM_GRAY,
            }}
            contentContainerStyle={{
                flexGrow: 1,
                
            }}
        >
            <WebView
                originWhitelist={['*']}
                style={{backgroundColor: 'transparent', margin: 16, }}
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
            <TouchableOpacity style={styles.nailedButton}>
                <Text style={styles.nailedText}>NAILED2 IT</Text>
            </TouchableOpacity>
            <View style={{height: 100}}></View>
        </ScrollView>
    );
}

export default GoalScreen;