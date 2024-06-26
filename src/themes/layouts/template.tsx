import { StyleSheet, Text, View, ImageBackground, Dimensions } from "react-native";
import { ReactNode } from 'react'
import { AppBackButton } from "../components/back-button";
import { AppColors } from "../colors";
import { StatusBar } from "expo-status-bar";
import { AppFont } from "../fonts";

export interface AppTemplate {
    children: ReactNode,
    titulo: string,
    icon?: ReactNode,
    backButton?: boolean
    background?: 'wave'|'abstract'|'abstract2',
    color?: string,
    fullComponent?:ReactNode, 
    smallHeader?: boolean

}


export default function AppTemplate({backButton, children, titulo, background, color = AppColors.PRIMARY, fullComponent, smallHeader, icon}:AppTemplate) {

    const getBG = () => {
        if (background == 'abstract') return require('./../../assets/efeitos/abstract.png')
        else if (background == 'abstract2') return require('./../../assets/efeitos/abstract2.png')
        else return require('./../../assets/efeitos/waves.png')
    }

    return (
        <View style={[styles.container, {backgroundColor: color, height: Dimensions.get("window").height}]}>
            <ImageBackground style={{width: '100%', height: '100%', paddingTop: 30}} source={getBG()}>
                <StatusBar style="light" />

                {/* HEADER */}
                <View style={[styles.header, {height: smallHeader ? 75 : 150}]}>
                    <View style={{flex:1}}>
                        {backButton && <AppBackButton color="white" />}<Text></Text>
                    </View>
                    <>
                        <Text style={styles.title}>{titulo}</Text>
                        { icon }
                    </>
                </View>

                {/* MAIN */}
                <View style={styles.main}>
                    {children}
                </View>

                {fullComponent}
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        height: 150,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 10
    },
    title: {
        fontFamily: AppFont.NEGRITO,
        color: 'white',
        textAlign: 'right',
        fontSize: 23,
        textTransform: 'uppercase'
    },
    main: {
        flex: 1,
        backgroundColor: AppColors.BACKGROUND,
        borderTopEndRadius: 30,
        borderTopStartRadius: 30,
        padding: 10
    }
});