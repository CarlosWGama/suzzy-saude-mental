import * as React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, Alert } from 'react-native';
import { AppFont } from '../../../../../themes/fonts';
import { AppButton } from '../../../../../themes/components/button';
import { AppColors } from '../../../../../themes/colors';
import Range from './range';
import { PlantaRegada, Sintomas, useQuestionarioDiarioService } from '../../../../../provider/questionario.service';

export interface QuestionarioDiarioProps {
    onResponder(Planta: PlantaRegada):void;
}

export function QuestionarioDiario ({onResponder}: QuestionarioDiarioProps) {

    const questinarioSrv = useQuestionarioDiarioService();
    const [ sintomas, setSintomas ] = React.useState<Sintomas>({
        tristeza: null,
        choro: null,
        medo: null,
        desconcentracao: null,
        nauseas: null,
        insonia: null,
        higiene: null,
        isolamento: null
    })
    // ==============
    const handleRange = (sintoma: 'tristeza'|'choro'|'medo'|'desconcentracao'|'nauseas'|'insonia'|'higiene'|'isolamento', valor: number) => {
        switch(sintoma) {
            case 'tristeza':        setSintomas({...sintomas, tristeza: valor}); break;
            case 'choro':           setSintomas({...sintomas, choro: valor}); break;
            case 'medo':            setSintomas({...sintomas, medo: valor}); break;
            case 'desconcentracao': setSintomas({...sintomas, desconcentracao: valor}); break;
            case 'nauseas':         setSintomas({...sintomas, nauseas: valor}); break;
            case 'insonia':         setSintomas({...sintomas, insonia: valor}); break;
            case 'higiene':         setSintomas({...sintomas, higiene: valor}); break;
            case 'isolamento':      setSintomas({...sintomas, isolamento: valor}); break;
        }
    }
    // ------
    const handleResponder = async () => {
        try {
            const retorno = await questinarioSrv.cadastro(sintomas);
            if (retorno.sucesso && retorno.planta) 
                onResponder(retorno.planta);
            else
                Alert.alert('Falha ao responder questionário', retorno.erro)
            
        } catch(e) {
            console.log(e);
            Alert.alert('Falha ao responder questionário');
        }
    }
    //===============
    return (
        <ScrollView style={styles.container} >
         <Text style={styles.descricao}>Registre aqui como tem se sentido dia após dia, para podermos te acompanhar e auxiliar melhor durnate uma crise.</Text>
         <Text style={styles.descricao}>Responda com as carinhas de como tem se sentindo, para cada item abaixo, sendo o mais a esquerda, o sintoma não me afeta, e o mais a direita o sintoma me afeta muito.</Text>
         
         {/* SENTIMENTO */}
         <Text style={styles.sintoma}>Tristeza</Text>
         <Range selected={sintomas.tristeza} onSelect={(sentimento) => handleRange('tristeza', sentimento)} />

         <Text style={styles.sintoma}>Choro</Text>
         <Range selected={sintomas.choro} onSelect={(sentimento) => handleRange('choro', sentimento)} />

         <Text style={styles.sintoma}>Medo</Text>
         <Range selected={sintomas.medo} onSelect={(sentimento) => handleRange('medo', sentimento)} />
         
         <Text style={styles.sintoma}>Desconcentração</Text>
         <Range selected={sintomas.desconcentracao} onSelect={(sentimento) => handleRange('desconcentracao', sentimento)} />

         <Text style={styles.sintoma}>Náuseas</Text>
         <Range selected={sintomas.nauseas} onSelect={(sentimento) => handleRange('nauseas', sentimento)} />

         <Text style={styles.sintoma}>Insônia</Text>
         <Range selected={sintomas.insonia} onSelect={(sentimento) => handleRange('insonia', sentimento)} />

         <Text style={styles.sintoma}>Higiene</Text>
         <Range selected={sintomas.higiene} onSelect={(sentimento) => handleRange('higiene', sentimento)} />

         <Text style={styles.sintoma}>Isolamento</Text>
         <Range selected={sintomas.isolamento} onSelect={(sentimento) => handleRange('isolamento', sentimento)} />
      
         <AppButton title='Responder' color={AppColors.SUCCESS} onPress={handleResponder}  disabled={Object.values(sintomas).includes(null)} />
      </ScrollView>
    );
}

export default React.memo(QuestionarioDiario)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        padding: 10,
        paddingBottom: 40
    },
    sintoma: {
        textAlign: 'center',
        margin: 20,
        fontFamily: AppFont.NEGRITO,
        fontSize: 16
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