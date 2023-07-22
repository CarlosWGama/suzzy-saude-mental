import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native';
import { AppFont } from '../../../../../themes/fonts';
import { AppCheck } from '../../../../../themes/components/check';
import { AppButton } from '../../../../../themes/components/button';
import { AppColors } from '../../../../../themes/colors';

export interface QuestionarioTermoMentalProps {
    onCalcular(itens:any):void;
}

export function QuestionarioTermoMental ({onCalcular}: QuestionarioTermoMentalProps) {
    type opcao = {texto:string, id:number, pontos:number};
    const opcoes: opcao[] = [
        {texto: 'Opção 1', id: 1, pontos: 1},
        {texto: 'Opção 2', id: 2, pontos: 1},
        {texto: 'Opção 3', id: 3, pontos: 1},
        {texto: 'Opção 4', id: 4, pontos: 1},
        {texto: 'Opção 5', id: 5, pontos: 1},
    ]

    const [ selecionados, setSelecionados] = React.useState<opcao[]>([])

    // ==============
    const handleSwitch = (item: opcao) => {
        
        let novaSelecao = [...selecionados];
        if (selecionados.map(item => item.id).includes(item.id)) {
            const index = selecionados.indexOf(item);
            novaSelecao.splice(index, 1);  
        } else {
            novaSelecao.push(item);
        }
        
        setSelecionados(novaSelecao)
    }

    //===============
    return (
        <ScrollView style={styles.container}>
         <Text style={styles.descricao}>O questionário abaixo pode te ajudará a saber se você está passando por algum problema que precise de apoio!</Text>
         <Text style={styles.descricao}>Marque as opções que você considera que tenha sentindo ultimamente.</Text>
         <View style={{margin:10}}>
            {opcoes.map(item => (
                <View key={item.id} style={styles.opc}>
                    <Switch onTouchStart={() => handleSwitch(item)} value={selecionados.map(item => item.id).includes(item.id)} />
                    <Text style={styles.descricao}>{item.texto}</Text>
                </View>
            ))}
         </View>
         <AppButton title='Calcular' color={AppColors.SUCCESS} onPress={() => onCalcular(selecionados)}/>
      </ScrollView>
    );
}

export default React.memo(QuestionarioTermoMental)

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        fontSize: 15,
        textAlign: 'justify',
        marginBottom:10
    },
    opc: {
        flexDirection: 'row',
        alignItems: 'center'
    }
});