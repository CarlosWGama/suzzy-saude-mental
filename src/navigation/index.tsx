import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/app/home';
import CadastroScreen from '../screens/cadastro';
import InicialScreen from '../screens/inicial';
import LoginScreen from '../screens/login';
import { NavegacaoApp } from './app';


export type NavParamsRoot = {
    inicial: undefined,
    login: undefined, 
    cadastro: undefined,
    app: undefined
} 

const Stack = createNativeStackNavigator<NavParamsRoot>();

export default function NavegacaoPrincipal() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name='inicial' component={InicialScreen} />
                <Stack.Screen name='login' component={LoginScreen} />
                <Stack.Screen name='cadastro' component={CadastroScreen} />
                <Stack.Screen name='app' component={NavegacaoApp} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}