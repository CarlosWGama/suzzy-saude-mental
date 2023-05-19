import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/app/home';
import CadastroScreen from '../screens/cadastro';
import InicialScreen from '../screens/inicial';
import LoginScreen from '../screens/login';
import { NavegacaoApp } from './app';
import { View } from 'react-native';
import { useContextApp } from '../provider/context';
import { useEffect } from 'react';


export type NavParamsRoot = {
    bootstrap: undefined,
    inicial: undefined,
    login: undefined, 
    cadastro: undefined,
    app: undefined
} 

const Stack = createNativeStackNavigator<NavParamsRoot>();


const BootstrapScreen = () => {

    const { usuario, loading } = useContextApp();
    const nav = useNavigation<any>();

    useEffect(() => {
        if (loading)
            nav.reset({index: 0, routes: [{name: usuario ? 'app' : 'inicial'}]})
    }, [loading]);


    return <View/>
}

export default function NavegacaoPrincipal() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name='bootstrap' component={BootstrapScreen} />
                <Stack.Screen name='inicial' component={InicialScreen} />
                <Stack.Screen name='login' component={LoginScreen} />
                <Stack.Screen name='cadastro' component={CadastroScreen} />
                <Stack.Screen name='app' component={NavegacaoApp} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}