import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppColors } from "../colors";
import { AppFont } from "../fonts";


export interface Props {
    title: string,
    onPress(): void
    color?: string,
    textColor: string
    outline?:boolean,
    carregando?:boolean
    disabled?:boolean
}

export function AppButton({title, onPress, color, outline, textColor, carregando, disabled}: Props) {

    return (
        <>
            { (!carregando && !disabled) && <TouchableOpacity onPress={onPress}>
                <View style={[styles.container, {backgroundColor: (outline ? 'transparent' : color), borderColor: (outline ? color : 'transparent')}]}>
                    <Text style={[styles.title, { color: (outline ? color : textColor)}]}>{title}</Text>
                </View>
            </TouchableOpacity>}

            { (carregando || disabled) &&
                <View style={[styles.container, {backgroundColor: (outline ? 'transparent' : 'lightgrey'), borderColor: (outline ? 'lightgrey' : 'transparent')}]}>
                    { disabled && <Text style={[styles.title, { color: (outline ? 'lightgrey' : 'white')}]}>{title}</Text>}
                    { carregando && <ActivityIndicator color={(outline ? 'lightgrey' : 'white')} size={18} />}
                </View>
            }
        </>
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