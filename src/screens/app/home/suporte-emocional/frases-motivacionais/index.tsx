import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppFont } from "../../../../../themes/fonts";
import { AppButton } from "../../../../../themes/components/button";
import { AppColors } from "../../../../../themes/colors";

export interface ModalProps {
    onBack():void;
}

function FrasesMotivacionaisModal({onBack}: ModalProps) {

    const [ index, setIndex ] = useState(0);
    const frases = [
        'Seja profundamente apaixonado pela vida. Pois a vida é um espetáculo imperdível \n(Augusto Cury).',
        'Que você tenha serenidade e calma para resolver as situações difíceis. Você é um vencedor e vai superar qualquer momento difícil \n(Autoria própria).',
        'Não sei exatamente pelo que você está passando, mas saiba que não está sozinho. Essa tempestade também vai passar! \n(Autor desconhecido)',
        'Acredite que você pode, assim você já estará no meio do caminho \n(Theodore Roosevelt).',
        'Tenha coragem! Porque ela é a alavanca propulsora para a realização de suas conquistas. Seja a sua melhor versão! O mundo te espera! Siga em frente \n(Autoria Própria).',
        'A coragem está a um passo à frente do medo. Acredite em você! \n(Coleman Young)',
        'Quando tudo parecer impossível, é sinal de que está precisando de uns bons dias de descanso para aliviar a pressão e liberar a sua mente. Depois, verá que os problemas nem eram tão grandes assim \n(Autor desconhecido).'
    ]
    // ================================================
    const selectPhrase = () => {
        const dia = new Date().getDate();
        setIndex(dia%frases.length);
    }

    // =======
    useEffect(() => {
       selectPhrase()
      }, []);

    //=================================================
    return (
        <View style={styles.container}>
            {/* HEADER */}
            <Text style={styles.title}>Frases Motivacionais</Text>
            <Text style={styles.description}>Sua frase hoje do dia é </Text>

            <Text style={styles.phrase}>{frases[index]} </Text>


            {/* BOTÃO VOLTAR */}
            <AppButton title="VOLTAR" color={AppColors.SUCCESS} onPress={onBack}/>
        </View>
    )
}

export default React.memo(FrasesMotivacionaisModal)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 20
    },
    title: {
        fontFamily: AppFont.NEGRITO,
        textAlign: 'center',
        marginBottom: 10
    },
    description: {
        fontFamily: AppFont.PADRAO,
        textAlign: 'center'
    },
    phrase: {
        fontSize: 20,
        marginVertical: 30,
        fontStyle: 'italic',
        textAlign: 'center'
    }
});