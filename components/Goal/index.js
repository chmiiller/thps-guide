import React, { useState } from 'react';
import { Button, Dimensions, ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Collapsible from 'react-native-collapsible';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { ATOM_BLUE, ATOM_GRAY, ATOM_YELLOW, GRAY3 } from '../../constants/colors';
import { WebView } from 'react-native-webview';

const styles = StyleSheet.create({
    headerView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 12,
        marginHorizontal: 16,
        backgroundColor: GRAY3,
        borderRadius: 10,
        height: 40,
    },
    headerText: {
        fontSize: 16,
        padding: 10,
        textAlign: 'left',
        fontWeight: 'bold',
        color: ATOM_YELLOW
    },
    headerCheckContainer: {
        width: 30,
        height: 30,
        backgroundColor: ATOM_GRAY,
        borderColor: ATOM_YELLOW,
        borderWidth: 2,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight:  1,
    },
    contentView: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 12,
        marginHorizontal: 16,
        height: 'auto',
    },
    contentText: {
        fontSize: 14,
        textAlign: 'left',
        color: ATOM_YELLOW
    },
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

const Goal = ({ item, onClick }) => {
    const [collapsed, setCollapsed] = useState(true);
    const toggleCollapsed = () => {
        // setCollapsed(!collapsed);
        onClick(item);
    };

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
        <View>
            <TouchableOpacity onPress={toggleCollapsed} style={styles.headerView}>
                <Text style={styles.headerText}>
                    {item.title}
                </Text>
                <View style={styles.headerCheckContainer}>
                    <Icon name={'check-bold'} size={20} color={collapsed ? ATOM_BLUE : ATOM_YELLOW} />
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default Goal;