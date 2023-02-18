import { Text, TextInput, StyleSheet, KeyboardTypeOptions } from 'react-native';
import { AppColors } from '../colors';
import React from 'react';
import { AppFont } from '../fonts';

export interface AppProps {
    onChangeText(text: string):void,
    title?: string,
    error?: string,
    placeholder?: string,
    senha?: boolean,
    touched?: boolean,
    keyboardType?:KeyboardTypeOptions
    onBlur?(campo: string):void

}


export function AppInput(props: AppProps) {

    return (
        <>
            {props.title && <Text style={styles.text}>{props.title}</Text>}
            <TextInput 
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
                secureTextEntry={props.senha}
                keyboardType={props.keyboardType}
                onBlur={props.onBlur}
                style={styles.input} />
            {props.touched && props.error && <Text style={styles.error}>{props.error} ***</Text>}
        </>
    )
}

export default React.memo(AppInput)



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
    input: {
        backgroundColor: AppColors.BACKGROUND,
        padding: 5,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        
        elevation: 3,
    }
});