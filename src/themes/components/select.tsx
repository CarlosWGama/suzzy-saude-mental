import { Text, StyleSheet } from 'react-native';
import { AppColors } from '../colors';
import React from 'react';
import { AppFont } from '../fonts';
import { Picker } from '@react-native-picker/picker';

export interface AppProps {
    onChange(value: any):void,
    title?: string,
    error?: string;
    selected?: any
    options: {label:string, value:any}[];
}


export function AppSelect(props: AppProps) {

    return (
        <>
            {props.title && <Text style={styles.text}>{props.title}</Text>}
            {/* PICKER*/}
            <Picker
                selectedValue={props.selected}
                onValueChange={(itemValue, itemIndex) =>
                    props.onChange(itemValue)
                }>
                    {props.options.map((item, index) => (
                        <Picker.Item style={styles.item} key={""+index} label={item.label} value={item.value} />
                    ))}
            </Picker>
            {props.error && <Text style={styles.error}>{props.error} ***</Text>}
        </>
    )
}

export default React.memo(AppSelect)



const styles = StyleSheet.create({
    text: {
        fontFamily: AppFont.PADRAO
    },
    error: {
        fontFamily: AppFont.NEGRITO,
        color: 'tomato',
        marginTop: -15,
        marginBottom: 15,
        textAlign: 'right'
    },
    item: {
        backgroundColor: AppColors.BACKGROUND,
        marginBottom: 15,
        fontSize: 12
    }
});