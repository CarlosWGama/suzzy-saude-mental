import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from "react-native";
import { AppFont } from '../../../../themes/fonts';
import { Questionario, Planta } from './components';
import moment from 'moment';
import { PlantaRegada, useQuestionarioDiarioService } from '../../../../provider/questionario.service';

function QuestionarioDiarioModal(props: any) {

    const [ repondido, setRespondido ] = React.useState(false);
    const [ planta, setPlanta ] = React.useState<PlantaRegada>({dias_aguado: 0});
    const questionarioSrv = useQuestionarioDiarioService();
    // ===================================================================================
    const onResponder = React.useCallback((planta: PlantaRegada) => {
        setPlanta(planta);
        setRespondido(true);
    }, []);
    // ---------
    const handleIniciar = async () => {
        try {
            const dados = await questionarioSrv.buscar();
            if (dados.sucesso && dados.planta) {
                setPlanta(dados.planta);
                setRespondido(true);
            }
        } catch (e) {
            console.log(e);
        }   
    }
    // ---------
    useEffect(() => {
        handleIniciar();
    }, [])
    // ===================================================================================
    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Registro Diário - {moment().format('DD/MM/YYYY')}</Text>
            { !repondido && <Questionario onResponder={onResponder}/>}
            { repondido && <Planta pontos={planta.dias_aguado}/>}
        </View>
    )
}

export default React.memo(QuestionarioDiarioModal)

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