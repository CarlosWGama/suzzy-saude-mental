import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { AppFont } from '../../../../themes/fonts';

export interface AppProps {
}

function CVVModal(props: AppProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Título</Text>
            <Text style={styles.descricao}>descrição Bla bla bla bla bla</Text>
        </View>
    )
}

export default React.memo(CVVModal)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 10
    },
    titulo: {
        textAlign: 'center',
        margin: 20,
        fontFamily: AppFont.NEGRITO,
        fontSize: 20
    },
    descricao: {
        fontFamily: AppFont.PADRAO,
        fontSize: 17,
        textAlign: 'justify'
    }
});