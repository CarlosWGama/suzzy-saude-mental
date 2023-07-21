import React, { ReactNode } from 'react';
import { Linking, StyleSheet, Text, View } from "react-native";
import { AppFont } from '../../../../../themes/fonts';
import { AppColors } from '../../../../../themes/colors';
import { AppButton } from '../../../../../themes/components/button';

export interface AppProps {
    onBack():any;
}

function CVVModal({onBack}: AppProps) {

    const textos = [
        "Realiza apoio emocional e prevenção do suicídio",
        "Atendimentos voluntários",
        "Apoio de pessoas que querem e precisam conversar",
        "Total sigilo de suas informações e identidade",
        "Suporte 24 horas por dia",
        "Atendimento pelo telefone 188"
    ]

    const handleOpenSite = React.useCallback(() => {
        Linking.openURL(`https://www.cvv.org.br/`);
    }, []);



    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>CVV</Text>
            <Text style={styles.descricao}>Conheça o que CVV (Centro de Valorização da Vida) oferece a você:</Text>

            <View style={styles.cards}>
                { textos.map((texto, index) => (
                    <View key={index} style={styles.card}>
                        <Text style={styles.cardText}>{texto}</Text>
                    </View>
                ))}
            </View>

            <AppButton title='Clique aqui apra acessar o site' color={AppColors.SECONDARY} onPress={handleOpenSite} />
            <AppButton title='Voltar' color={AppColors.TERTIARY} onPress={onBack} />
                
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
        textAlign: 'center'
    },
    cards: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    card: {
        backgroundColor: AppColors.PRIMARY,
        padding: 10,
        borderRadius: 10,
        height: 90,
        width: 180,
        maxWidth: '49%',
        marginVertical: 10,
        justifyContent: 'center'
    },
    cardText: {
        color: 'white',
        fontFamily: AppFont.NEGRITO,
        textAlign: 'center',
        fontSize: 14
        
    }
});