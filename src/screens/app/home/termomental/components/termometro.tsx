import * as React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { AppFont } from '../../../../../themes/fonts';
import { AppCheck } from '../../../../../themes/components/check';
import { AppButton } from '../../../../../themes/components/button';
import { AppColors } from '../../../../../themes/colors';

export interface TermometroTermoMentalProps {
    onBack():void;
    pontos:number
}

export function TermometroTermoMental ({onBack, pontos}: TermometroTermoMentalProps) {

    //Valor entre 0 e 50
    const [ termometro, setTermometro ] = React.useState({porcentagem: '0%', descricao: 'blabla', cor: 'green'})


    React.useEffect(() => {
        if (pontos == 0)  setTermometro({cor: 'lightgreen', descricao: 'Mensagem 0...', porcentagem: '0%'})
        else if (pontos <= 1) setTermometro({cor: '#8FBC8F', descricao: 'Mensagem 1', porcentagem: '10%'})
        else if (pontos <= 2) setTermometro({cor: '#FAFAD2', descricao: 'Mensagem 2', porcentagem: '20%'})
        else if (pontos <= 3) setTermometro({cor: '#FFD700', descricao: 'Mensagem 3', porcentagem: '30%'})
        else if (pontos <= 4) setTermometro({cor: '#FFA500', descricao: 'Mensagem 4 ', porcentagem: '40%'})
        else if (pontos <= 5) setTermometro({cor: '#FF4500', descricao: 'Mensagem 5 asdasd asd asd asda sd asd ad asd asd asd asd as das da sa das a das d', porcentagem: '50%'})

    }, [pontos]);
    
   
    //===============
    return (
        <View style={styles.container}>
            {/* TERMOMETRO */}
            <Text style={styles.descricao}>Está é a analise das suas respostas!</Text>
            <View style={styles.containerTermometro}>
                <ImageBackground source={require('./../../../../../assets/termometro.png')} style={{width: 135, height: 256, alignItems: 'center', justifyContent: 'flex-end'}}>
                    <View style={[styles.bar, {height: termometro.porcentagem}]}/>
                </ImageBackground>
                <Text style={[styles.textoTermometro, {backgroundColor: termometro.cor}]}>{termometro.descricao}</Text>
            </View>
            
            {/* FOOTER */}
            <Text style={styles.descricao}>Pontos: {pontos}</Text>
            <AppButton title='Voltar' color={AppColors.SUCCESS} onPress={onBack}/>
      </View>
    );
}

export default React.memo(TermometroTermoMental)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        padding: 10
    },
    descricao: {
        fontFamily: AppFont.PADRAO,
        fontSize: 15,
        textAlign: 'center',
        marginBottom:10
    },
    textoTermometro: {
        fontFamily: AppFont.NEGRITO,
        fontSize: 14,
        textAlign: 'center',
        padding: 10,
        borderRadius: 10,    
        marginBottom:10,
        marginLeft: 20,
        maxWidth: 200,

        //shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.39,
        shadowRadius: 8.30,

        elevation: 13,
    },
    containerTermometro: {
        width: 512,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30
    },
    bar: {
        backgroundColor: '#e82242',
        marginBottom: 100,
        width: 12,

    }
    
});