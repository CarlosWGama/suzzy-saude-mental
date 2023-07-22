import React, { ReactNode } from 'react';
import { StyleSheet, Switch, Text, View } from "react-native";
import { AppFont } from '../../../../themes/fonts';
import { QuestionarioTermoMental } from './components';
import { TermometroTermoMental } from './components';

export interface AppProps {
}

function TermoMentalModal(props: AppProps) {

    const [ exibirTermometro, setExibirTermometro ] = React.useState(false);
    const [ pontos, setPontos ] = React.useState(0);

    const onCalcular = React.useCallback((itens: any) => {
        let pontos = 0;
        itens.forEach((item:any) => {
            pontos += item.pontos;
        })
        setPontos(pontos);
        setExibirTermometro(true);
    }, []);


    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>TermoMental</Text>
            { !exibirTermometro && <QuestionarioTermoMental onCalcular={onCalcular}/>}
            { exibirTermometro && <TermometroTermoMental onBack={() => setExibirTermometro(false)} pontos={pontos}/>}
        </View>
    )
}

export default React.memo(TermoMentalModal)

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