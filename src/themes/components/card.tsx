import React, { ReactNode } from 'react';
import { StyleSheet, Text, View, StyleProp, ViewStyle } from "react-native";
import { AppColors } from '../colors';

export interface AppProps {
    children: ReactNode,
    style?: StyleProp<ViewStyle>
}

function AppCard(props: AppProps) {
    return (
        <View style={[styles.container, props.style]}>
            {props.children}
        </View>
    )
}

export default React.memo(AppCard)

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignContent: 'center',
        borderWidth: 1,
        borderColor: 'lightgrey',
        padding: 20,
        borderRadius: 10,
        backgroundColor: AppColors.BACKGROUND,

        shadowColor: "#000",
        shadowOffset:{
        width: 0,
        height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    }
});