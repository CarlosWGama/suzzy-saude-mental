import { Text, StyleSheet, Switch, View } from 'react-native';
import { AppColors } from '../colors';
import React from 'react';
import { AppFont } from '../fonts';

export interface AppProps {
    onChange(value: boolean):void,
    title: string,
    error?: string;
    selected?: boolean
}


export function AppCheck(props: AppProps) {

    return (
        <View style={styles.container}>
            {props.title && <Text style={styles.text}>{props.title}</Text>}
            {/* CHECK*/}
            <Switch
                trackColor={{true: AppColors.PRIMARY, false: AppColors.BACKGROUND}}
                thumbColor={props.selected ? '#f5dd4b' : '#f4f3f4'}
                // ios_backgroundColor="#3e3e3e"
                onValueChange={props.onChange}
                value={props.selected}
            />
            {props.error && <Text style={styles.error}>{props.error} ***</Text>}
        </View>
    )
}

export default React.memo(AppCheck)



const styles = StyleSheet.create({
    text: {
        fontFamily: AppFont.PADRAO,
        textAlign: 'justify',
        marginRight: 10
    },
    error: {
        fontFamily: AppFont.NEGRITO,
        color: 'tomato',
        marginTop: -15,
        marginBottom: 15,
        textAlign: 'right'
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    item: {
        backgroundColor: AppColors.BACKGROUND,
        marginBottom: 15,
        fontSize: 12
    }
});