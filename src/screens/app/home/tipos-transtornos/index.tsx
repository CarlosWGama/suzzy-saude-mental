import React, { ReactNode } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AppFont } from '../../../../themes/fonts';
import { AppColors } from '../../../../themes/colors';

export interface AppProps {
}

function TiposTranstornosModal(props: AppProps) {

    const ansiedade = [
        'Medo exagerado',
        'Inquietação ou sensação de estar com os nervos à flor da pele',
        'Cansaço',
        'Dificuldade de se concentrar ou esquecimento',
        'Irritabilidade',
        'Tensão Muscular',
        'Dificuldade de cochilar, manter o sono ou sono insatisfatório (inquieto)',
        'Coração acelarado', 
        'falta de ar', 
        'aperto no peito'
    ]

    const depressao = [
        'Sente-se triste',
        'Parece choroso',
        'Dificuldade de concentração',
        'Humor irritado a maior parte do dia',
        'Pensamento acelerado',
        'Ganho de peso (sem motivo aparente)',
        'Perda de peso (sem motivo aparente)',
        'Pensamento em morte',
        'Insonia ou hipersonia quase todos os dias'
    ]

    const estress = [
        'Dor de cabeça',
        'Dificuldade para dormir e manter o sono',
        'Dificuldade de concentração',
        'Irritação',
        'Dor nas costas',
        'Aperto de mandíbula',
        'Roer unha',
        'Batimento cardíaco acelerado',
        'Dor de estômago'
    ]




    return (
        <View style={styles.container}>

                <Text style={styles.titulo}>TIPOS DE TRANSTORNOS</Text>
                <Text style={styles.descricao}>Dessa a barra de rolagem para conheça os sintomas de cada transtorno mental</Text>
                
            <ScrollView>
                {/* ANSIEDADE */}
                <Text style={styles.tituloTranstorno}>ANSIEDADE</Text>
                <View style={{paddingHorizontal:40}}>
                    {ansiedade.map((sintoma, index) => <Text key={""+index}  style={styles.textSintoma}>{`\u2022 ${sintoma}`}</Text>)}
                </View>
                
                {/* DEPRESSÃO */}
                <Text style={styles.tituloTranstorno}>DEPRESSÃO</Text>
                <View style={{paddingHorizontal:40}}>
                    {depressao.map((sintoma, index) => <Text key={""+index}  style={styles.textSintoma}>{`\u2022 ${sintoma}`}</Text>)}
                </View>
                
                
                {/* ESTRESS */}
                <Text style={styles.tituloTranstorno}>ESTRESSE</Text>
                <View style={{paddingHorizontal:40}}>
                    {estress.map((sintoma, index) => <Text key={""+index}  style={styles.textSintoma}>{`\u2022 ${sintoma}`}</Text>)}
                </View>

           
            </ScrollView>
        </View>
    )
}

export default React.memo(TiposTranstornosModal)

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
    tituloTranstorno: {
        textAlign: 'center',
        margin: 20,
        fontFamily: AppFont.NEGRITO,
        fontSize: 18
    },
    textSintoma: {
        fontFamily: AppFont.LIGHT,
        fontSize: 15
    },
    
});