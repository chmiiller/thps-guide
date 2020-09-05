import React, { useState, useLayoutEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { WebView } from 'react-native-webview';

import { ATOM_BLUE, ATOM_GRAY, ATOM_YELLOW } from '../../../constants/colors';

const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: ATOM_GRAY,
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    container: {
        backgroundColor: ATOM_GRAY,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    scrollView: {
        backgroundColor:ATOM_GRAY,
    },
    webView: {
        backgroundColor: 'transparent',
        margin: 16,
    },
    flatList: {
        marginTop: 40,
    },
});

const AboutScreen = ({ route, navigation }) => {
    const [item, setItem] = useState(route.params.item);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: !item.title ? 'About' : item.title,
        });
    }, [navigation, item]);

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
                                <div style="height: 600px; width: 100%;">${item.content}</div>
                            </body>
                        </html>
                    `
                }}
                automaticallyAdjustContentInsets={false}
            />
            <View style={{height: 100}}></View>
        </ScrollView>
    );
}

export default AboutScreen;
