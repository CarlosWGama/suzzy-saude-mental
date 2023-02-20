import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContextApp } from '../provider/context';
import AlterarContatoScreen from '../screens/app/config/alterar-contato';
import AlterarDadosScreen from '../screens/app/config/alterar-dados';
import AlterarSenhaScreen from '../screens/app/config/alterar-senha';
import ConfigScreen from '../screens/app/config/config';
import ConfigDeslogadoScreen from '../screens/app/config/config-deslogado';

export type NavParamsConfig = {
    index_config: undefined,
    alterar_dados: undefined,
    alterar_senha: undefined,
    alterar_contato: undefined,
    login: undefined

}

const Stack = createNativeStackNavigator<NavParamsConfig>();

export function NavegacaoConfig() {

    const { usuario } = useContextApp();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='index_config' component={(usuario ? ConfigScreen : ConfigDeslogadoScreen)} />
            <Stack.Screen name='alterar_dados' component={AlterarDadosScreen} />
            <Stack.Screen name='alterar_senha' component={AlterarSenhaScreen} />
            <Stack.Screen name='alterar_contato' component={AlterarContatoScreen} />
        </Stack.Navigator>
    )
}