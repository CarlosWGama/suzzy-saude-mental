import React, { ReactNode, useState } from 'react';
import { Linking, StyleSheet, Text, View } from "react-native";
import { AppFont } from '../../../../themes/fonts';
import { AppColors } from '../../../../themes/colors';
import { AppSquareButton } from '../../../../themes/components';
import CVVModal from './cvv';
import CAVIDAModal from './cavida';

export interface AppProps {
}

function ApoioEmergencialModal(props: AppProps) {

    const [ tela, setTela ] = useState<'inicial'| 'cvv'| 'cavid'>('inicial');
    const onBack = React.useCallback(() => setTela('inicial'), []);
   
    return (
        <>
            {/* TELA INICIAL */}
            { tela == 'inicial' && <View style={styles.container}>
                <Text style={styles.titulo}>Apoio Emergêncial</Text>
                <Text style={styles.descricao}>Conheça instituições que podem te ajudar</Text>

                <View style={styles.cards}>
                    <AppSquareButton title='CVV' color={AppColors.SECONDARY} onPress={() => setTela('cvv')}/>
                    <AppSquareButton title='CAVIDA' color={AppColors.SECONDARY} onPress={() => setTela('cavid')}/>
                </View>    
            </View>}
            {/* TELA CVV */}
            {tela == 'cvv' && <CVVModal onBack={onBack}/>}
            {tela == 'cavid' && <CAVIDAModal onBack={onBack}/>}
        </>
    )
}

export default React.memo(ApoioEmergencialModal)

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