import { Alert, StyleSheet, Text, View } from "react-native";
import { AppColors } from "../../../themes/colors";
import { AppButton } from "../../../themes/components";
import { AppFont } from "../../../themes/fonts";
import AppTemplate from "../../../themes/layouts/template";
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp  } from '@react-navigation/native-stack'
import { NavParamsRoot } from "../../../navigation";
import { useContextApp } from "../../../provider/context";
import { NavParamsConfig } from "../../../navigation/config";
import { useUsuariosService } from "../../../provider/usuario.service";
import * as LocalAuthentication from 'expo-local-authentication';

export default function ConfigScreen() {

    
    const nav = useNavigation<NativeStackNavigationProp<NavParamsConfig, "index_config">>();
    const { setUsuario } = useContextApp();
    const usuarioService = useUsuariosService();

    //=======================================================================================
    const handleDeslogar = async () => {
        setUsuario(null)
        usuarioService.logout();
        nav.reset({index: 0, routes: [{name:'login'}]})
    }
    // ----------------------------
    const handleExcluir = async () => {
        Alert.alert('Excluir conta', 'Você deseja realmente fazer isso? Essa ação não poderá ser desfeita. ', [
            { text: 'Cancelar'},
            { text: 'Excluir', onPress: async () => {
                const permissao = await LocalAuthentication.authenticateAsync();
                if (permissao.success) {
                    const retorno = await usuarioService.excluir();
                    if (retorno.sucesso) {
                        setUsuario(null)
                        nav.reset({index: 0, routes: [{name:'login'}]})
                    } else {
                        Alert.alert('Houve uma falha na operação, tente novamente mais tarde');
                    }
                }
            }}
        ])
    }
    //=======================================================================================
    return (
    <AppTemplate smallHeader titulo="Configuração" background="abstract2" color={AppColors.TERTIARY}>
        <Text style={styles.text}>Opções</Text>

        <AppButton title="SAIR"  color={AppColors.TERTIARY} onPress={handleDeslogar} />
        <AppButton title="ALTERAR DADOS"  outline color={AppColors.TERTIARY} onPress={() => nav.push('alterar_dados')} />
        <AppButton title="ALTERAR CONTATO DE REFERÊNCIA PESSOAL" outline color={AppColors.TERTIARY} onPress={() => nav.push('alterar_contato')} />

        <AppButton title="EXCLUIR CONTA"  color={AppColors.TERTIARY} onPress={handleExcluir} />
    </AppTemplate>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    text: {
        margin: 30,
        textAlign: 'center',
        fontFamily: AppFont.NEGRITO,
        fontSize: 20
    }
});