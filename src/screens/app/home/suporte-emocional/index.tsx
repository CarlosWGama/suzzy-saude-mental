import React, { ReactNode, useState } from 'react';
import { Linking, StyleSheet, Text, View } from "react-native";
import { AppFont } from '../../../../themes/fonts';
import { AppColors } from '../../../../themes/colors';
import { AppSquareButton } from '../../../../themes/components';

export interface AppProps {
}

function SuporteEmocionalModal(props: AppProps) {

    const [ tela, setTela ] = useState<'inicial'| 'meditacao'| 'respiracao'|'acupuntura'|'frases'>('inicial');
    const onBack = React.useCallback(() => setTela('inicial'), []);
   
    return (
        <>
            {/* TELA INICIAL */}
            { tela == 'inicial' && <View style={styles.container}>
                <Text style={styles.titulo}>Apoio Emergêncial</Text>
                <Text style={styles.descricao}>Conheça instituições que podem te ajudar</Text>

                <View style={styles.cards}>
                    <AppSquareButton title='Meditações guiadas' textStyle={{fontSize: 12}} color={AppColors.SECONDARY} onPress={() => setTela('meditacao')}/>
                    <AppSquareButton title='Respiração Diafragmática' textStyle={{fontSize: 12}} color={AppColors.SECONDARY} onPress={() => setTela('respiracao')}/>
                    <AppSquareButton title='Vídeos de acupuntura' textStyle={{fontSize: 12}} color={AppColors.SECONDARY} onPress={() => setTela('acupuntura')}/>
                    <AppSquareButton title='Frases Motivacionais' textStyle={{fontSize: 12}}  color={AppColors.SECONDARY} onPress={() => setTela('frases')}/>
                </View>    
            </View>}
            {/* TELAS */}
            {tela == 'meditacao' && <Text>Sem item ainda</Text>}
            {tela == 'respiracao' && <Text>Sem item ainda</Text>}
            {tela == 'acupuntura' && <Text>Sem item ainda</Text>}
            {tela == 'frases' && <Text>Sem item ainda</Text>}

        </>
    )
}

export default React.memo(SuporteEmocionalModal)

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
        textAlign: 'center',
        marginBottom: 10
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