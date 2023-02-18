
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { AppFont } from "../fonts";

export interface AppProps {
    color?: string
} 

export function AppBackButton({color}:AppProps) {

    const nav = useNavigation();

    return (
        <TouchableOpacity onPress={() => nav.goBack()}>
            <Text style={[styles.title, {color}]}>VOLTAR</Text>
        </TouchableOpacity>
    )
}

AppBackButton.defaultProps = {
    color: 'black'
}

export default React.memo(AppBackButton)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center', 
    },
    title: {
        fontFamily: AppFont.NEGRITO,
        marginHorizontal: 10,
        fontSize: 18
    }
});