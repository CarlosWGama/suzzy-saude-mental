import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, StyleProp, TextStyle } from "react-native";
import { AppColors } from "../colors";
import { AppFont } from "../fonts";


export interface Props {
    title: string,
    onPress(): void
    color?: string,
    size?: number
    textColor: string,
    textStyle?: StyleProp<TextStyle>,

}

export function AppSquareButton({title, onPress, color, textColor, size, textStyle}: Props) {

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.container, {backgroundColor: color, borderColor: color, width: size, height: size}]}>
                <Text style={[styles.title, { color: textColor}, textStyle]}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default React.memo(AppSquareButton)

AppSquareButton.defaultProps = {
    color: AppColors.PRIMARY,
    textColor: 'white',
    size: 110,
    textStyle: {}
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: "center",
        alignItems: 'center',
        margin: 5,
        borderRadius: 5,
        borderWidth: 2,
        borderStyle: 'solid',

        shadowColor: "#000",
        shadowOffset:{
        width: 0,
        height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    title: {
        fontFamily: AppFont.NEGRITO,
        textAlign: 'center'
    }
});