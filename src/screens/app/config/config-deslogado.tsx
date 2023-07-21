import { StyleSheet, Text, View } from "react-native";
import { AppColors } from "../../../themes/colors";
import { AppButton } from "../../../themes/components";
import { AppFont } from "../../../themes/fonts";
import AppTemplate from "../../../themes/layouts/template";
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp  } from '@react-navigation/native-stack'
import { NavParamsRoot } from "../../../navigation";

export default function ConfigDeslogadoScreen() {


    const nav = useNavigation<NativeStackNavigationProp<NavParamsRoot, "app">>();

    return (
    <AppTemplate titulo="Configuração" background="abstract2" color={AppColors.TERTIARY}>
        <Text style={styles.text}>Você não está conectado. {"\n\n"}Nessa sessão de aplicativo, você terá acesso aos contatos emergências e anotações importantes.</Text>

        <AppButton title="LOGIN"  color={AppColors.TERTIARY}
            onPress={() => nav.reset({index: 0, routes: [{name:'login'}]})}
        />
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