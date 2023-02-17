import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppColors } from "../colors";
import { AppFont } from "../fonts";


export interface Props {
    title: string,
    onPress(): void
    color?: string,
    textColor: string
    outline?:boolean
}

export function AppButton({title, onPress, color, outline, textColor}: Props) {

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={[styles.container, {backgroundColor: (outline ? 'transparent' : color), borderColor: (outline ? color : 'transparent')}]}>
                <Text style={[styles.title, { color: textColor}]}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default React.memo(AppButton)

AppButton.defaultProps = {
    color: AppColors.PRIMARY,
    textColor: 'white'
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: 'center',
        margin: 5,
        borderRadius: 5,
        borderWidth: 2,
        borderStyle: 'solid'
    },
    title: {
        fontFamily: AppFont.NEGRITO
    }
});