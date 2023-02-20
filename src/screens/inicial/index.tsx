import AppIntroSlider from "react-native-app-intro-slider";
import { ImgPersonagem1, ImgPersonagem2, ImgPersonagem3, ImgPersonagem4 } from "../../assets/personagens";
import { AppConfig } from "../../config/app";
import { Image, StyleSheet, Text, View } from 'react-native';
import { AppFont } from "../../themes/fonts";
import { AppButton } from "../../themes/components";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavParamsRoot } from "../../navigation";

type IntroSlide = {
    titulo: string,
    descricao?: string
    imagem: any,
    cor: string,
    fim?: boolean
}

export default function InicialScreen() {

    const navigation = useNavigation<NativeStackNavigationProp<NavParamsRoot, "inicial">>();
    
    const dados: IntroSlide[] = [
        {titulo: 'Bem vindo!', descricao: `Seja muito bem vindo ao ${AppConfig.nome}, nós estamos aqui para te ajudar!`, imagem: ImgPersonagem1, cor:'#a8e6cf'},
        {titulo: AppConfig.nome, descricao: `O ${AppConfig.nome} é um aplicativo voltado a saude mental, onde você vamos aos poucos te ajudando a saber se possui algum problema que precise de apoio`, imagem: ImgPersonagem2, cor:'#dcedc1'},
        {titulo: 'Suporte 24h', descricao: `Aqui você também terá suporte 24h da nossa equipe, além de botões de acesso rápido a setores de apoio`, imagem: ImgPersonagem3, cor:'#ffd3b6'},
        {titulo: 'Seu acesso', descricao: `Queremos que seja muito bem vindo! Então vamos começar!`, imagem: ImgPersonagem4, cor:'#ffaaa5', fim:true}
    ]
    
    return (
        <AppIntroSlider 
            data={dados}
            nextLabel="PRÓXIMO"
            showDoneButton={false}
            renderItem={({item}) => (
                <View style={{flex: 1, backgroundColor: item.cor, padding: 20}}>
                    {/* TITULO */}
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={styles.titulo}>{item.titulo}</Text>
                    </View>
                    {/* IMAGEM */}
                    <View  style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                        <Image  source={item.imagem} style={styles.img} />
                    </View>
                    {/* DESCRICAO */}
                    <View  style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={styles.descricao}>{item.descricao}</Text>

                        {item.fim && <View style={styles.buttons}>
                            <AppButton title="Login/Criar Conta" onPress={() => navigation.reset({index: 0, routes: [{name: 'login'}]})} />
                            <AppButton title="Acessar sem logar" color="white"  outline onPress={() => navigation.reset({index: 0, routes: [{name: 'app'}]})} />
                        </View>}
                    </View>
                </View>
            )}        
        />
    )
}

const styles = StyleSheet.create({
    img: { height: 350, resizeMode: 'contain'},
    titulo: { fontFamily: AppFont.NEGRITO, fontSize: 20},
    descricao: { fontFamily: AppFont.PADRAO, fontSize: 17, textAlign: 'center'},
    buttons: { flexDirection: 'row'}
});