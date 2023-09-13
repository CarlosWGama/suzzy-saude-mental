import { StyleSheet, Text, View, Image, ScrollView, Linking, Alert } from "react-native";
import { ImgPersonagem1 } from "../../../assets/personagens";
import { AppColors } from "../../../themes/colors";
import { AppButton, AppCard } from "../../../themes/components";
import { AppSquareButton } from "../../../themes/components/square-button";
import { AppFont } from "../../../themes/fonts";
import AppTemplate from "../../../themes/layouts/template";
import * as Location from 'expo-location';
import { useAjudaService } from "../../../provider/ajuda.service";
import { PedidoAjuda } from "../../../models/ajuda.enum";
import { AppConfig } from "../../../config/app";
import { MaterialIcons } from '@expo/vector-icons';

export default function AjudaScreen() {


    const ajudaSrv = useAjudaService();
    // ENTRAR EM CONTATO VIA WHATSAPP COM CVV
    const handleWhatsApp = async (whatsappNumero: string, origemPedido:PedidoAjuda) => {
        const mensagem = 'Estou precisando de ajuda';
        ajudaSrv.cadastro(origemPedido);
        Linking.openURL(`whatsapp://send?phone=${whatsappNumero}&text=${mensagem}`);
    }

    // LIGAR PARA SAMU
    const handleTelefone = async (local:string, tel: string, origem: PedidoAjuda) => {
        
        
        Alert.alert(`Ligar ${local}`, `Você deseja realmente ligar para ${local}?`, [
            {text: 'SIM', onPress: () => {
                //Salva uma tentativa de pedir ajuda
                ajudaSrv.cadastro(origem);

                //Realiza a ligação
            }},
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
        <ScrollView>
            <AppTemplate titulo="Ajuda" background="abstract" color={AppColors.SECONDARY} icon={<MaterialIcons name="local-hospital" color="white" size={30}/>}>
                {/* HEADER */}
                <AppCard style={{marginTop: -100}}>
                    <View style={styles.card}>
                        <Image source={ImgPersonagem1} style={{height:150, width: 100, resizeMode: 'contain'}}/>
                        
                        <Text style={styles.cardText}>
                            Ajuda rápida! {"\n\n"}
                            Caso precise de uma ajuda rápida, você pode encontrar aqui!
                            Pode falar a qualquer momento com a equipe de apoio. Em caso de urgência em atendimento durante as crises, clicar no botão de enviar sua localização, além das opções de ligar.
                        </Text>
                    </View>
                </AppCard>

                {/* OPÇÕES */}
                <Text style={styles.informacoes}>Busque seu apoio</Text>

                <ScrollView>
                    <View style={styles.opcoes}>
                        <AppSquareButton color={AppColors.SECONDARY} title="WhatsApp do CVV" onPress={() => handleWhatsApp(AppConfig.whatsapp.CVV, PedidoAjuda.CVV)} />
                        <AppSquareButton color={AppColors.SECONDARY} title="WhatsApp do CAVIDA" onPress={() => handleWhatsApp(AppConfig.whatsapp.CAVIDA, PedidoAjuda.CAVIDA)} />
                        <AppSquareButton color={AppColors.SECONDARY} title="WhatsApp do Secretaria" onPress={() => handleWhatsApp(AppConfig.whatsapp.SMS, PedidoAjuda.SMS)} />
                        {/* <AppSquareButton color={AppColors.SECONDARY} title="Ligar Samu" onPress={handleSamu} /> */}
                        <AppSquareButton color={AppColors.SECONDARY} title="Enviar minha localização" onPress={handleLocalizacao}  />
                    </View>
            
                    <Text style={[styles.informacoes, {marginTop:-10}]}>Outros contatos</Text>

                    <View style={styles.opcoes}>
                        <AppButton color={AppColors.SECONDARY} title="Hospital" onPress={() => handleTelefone('Hospital', '35201585', PedidoAjuda.HOSPITAL)} />
                        <AppButton color={AppColors.SECONDARY} title="Samu" onPress={() => handleTelefone('Samu', '182', PedidoAjuda.SAMU)} />
                        <AppButton color={AppColors.SECONDARY} title="Polícia" onPress={() => handleTelefone('Polícia', '190', PedidoAjuda.POLICIA)}  />
                    </View>
                </ScrollView>
            </AppTemplate> 
        </ScrollView>
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
        fontSize: 14,
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