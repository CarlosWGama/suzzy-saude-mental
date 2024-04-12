import * as React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { AppFont } from '../../../../../themes/fonts';

export interface TermometroTermoMentalProps {
    pontos:number
}

export function Planta ({pontos}: TermometroTermoMentalProps) {

    //Valor entre 0 e 50
    const [ planta, setPlanta ] = React.useState<{imagem: any, descricao: string}>({imagem: null, descricao: ''})


    React.useEffect(() => {
        if (pontos <= 2)  setPlanta({imagem: require('./../../../../../assets/planta/triste.png'), descricao: 'Sua planta ainda está triste, continue respondido todos os dias para aguá-la para que ela fique feliz!'})
        else if (pontos <= 4) setPlanta({imagem: require('./../../../../../assets/planta/normal.png'), descricao: 'Sua planta está bem, continue respondendo todos os dias para torná-la bem viva!'})
        else setPlanta({imagem: require('./../../../../../assets/planta/feliz.png'), descricao: 'Parabéns! Continue assim para que ela siga feliz!'})
        

    }, [pontos]);
    
   
    //===============
    return (
        <View style={styles.container}>
            {/* PLANTA */}
            <Text style={styles.descricao}>Essa é a sua planta virtual! A cada dia que você responde seu questionário diário seguido, irá rega-la para que ela fique mais forte e feliz!</Text>
            <Image source={planta.imagem} style={{width: 153, height: 270}} />
            <Text style={styles.descricaoPlanta}>{planta.descricao}</Text>
            
            {/* FOOTER */}
            <Text style={styles.descricao}>Dias seguidos regados: <Text style={{fontWeight: 'bold'}}>{pontos}</Text></Text>
      </View>
    );
}

export default React.memo(Planta)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    },
    descricao: {
        fontFamily: AppFont.PADRAO,
        fontSize: 15,
        textAlign: 'center',
        marginBottom:10
    },
    descricaoPlanta: {
        fontFamily: AppFont.PADRAO,
        fontSize: 15,
        textAlign: 'center',
        marginBottom:10
    },
    
    
});