import { StyleSheet, Text, View, Image, ScrollView, Linking, Alert } from "react-native";
import { ImgPersonagem2 } from "../../../assets/personagens";
import { AppColors } from "../../../themes/colors";
import { AppCard } from "../../../themes/components";
import { AppSquareButton } from "../../../themes/components/square-button";
import { AppFont } from "../../../themes/fonts";
import AppTemplate from "../../../themes/layouts/template";
import * as Location from 'expo-location';

export default function AjudaScreen() {

    // ENTRAR EM CONTATO VIA WHATSAPP COM CVV
    const handleWhatsApp = async () => {
        const whatsappNumero = '+5582991341378' ;
        const mensagem = 'Estou precisando de ajuda';

        Linking.openURL(`whatsapp://send?phone=${whatsappNumero}&text=${mensagem}`);
    }

    // LIGAR PARA SAMU
    const handleSamu = async () => {
        Alert.alert('Ligar Samu', 'Você deseja realmente ligar para a samu?', [
            {text: 'SIM' },
            {text: 'NÃO, foi engano' },
        ])
    }

    // ENVIAR LOCALIZAÇÂO PARA CVV E AMIGOS
    const handleLocalizacao = async () => {
        Alert.alert('Pedido de ajuda com localização', 'Deseja enviar um pedido de ajuda para CVV com sua localização? \n\nCaso tenha um contato de confiança cadastrado, também será enviado para o seu whatsapp', [
            {text: 'SIM', onPress: async () => {
      
                    let { status } = await Location.requestForegroundPermissionsAsync();
                    if (status !== 'granted') {
                      Alert.alert('Erro', 'É preciso liberar permissão para bsucar sua localização');
                      return;
                    }
              
                    let location = await Location.getCurrentPositionAsync({});
                    console.log(location)

                    Alert.alert('Sucesso', 'Seu pedido de ajuda foi enviado!')
            } },
            {text: 'NÃO, foi engano' },
        ])
    }


    return (
        <AppTemplate titulo="Ajuda" background="abstract" color={AppColors.SECONDARY}>
            {/* HEADER */}
            <AppCard style={{marginTop: -100}}>
                <View style={styles.card}>
                    <Image source={ImgPersonagem2} style={{height:150, width: 100, resizeMode: 'contain'}}/>
                    
                    <Text style={styles.cardText}>
                        Ajuda rápida! {"\n"}
                        Caso precise de uma ajuda rápida, pode encontrar aqui!
                    </Text>
                </View>
            </AppCard>

            {/* OPÇÕES */}
            <Text style={styles.informacoes}>INFORMAÇÕES</Text>

            <ScrollView>
                <View style={styles.opcoes}>
                    <AppSquareButton color={AppColors.SECONDARY} title="WhatsApp do CVV" onPress={handleWhatsApp} />
                    <AppSquareButton color={AppColors.SECONDARY} title="Ligar Samu" onPress={handleSamu} />
                    <AppSquareButton color={AppColors.SECONDARY} title="Enviar minha localização" onPress={handleLocalizacao}  />
                </View>
            </ScrollView>
        </AppTemplate> 
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardText: {
        fontFamily: AppFont.PADRAO,
        fontSize: 17,
        textAlign: 'justify',
        width: 200
    },
    informacoes: {
        fontFamily: AppFont.NEGRITO,
        marginTop: 30
    },
    opcoes: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    }

});