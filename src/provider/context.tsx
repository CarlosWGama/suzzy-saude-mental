import { createContext, ReactNode, useState, useContext, useEffect } from 'react';
import { Usuario } from '../models/usuario';
import AsyncStorage from '@react-native-async-storage/async-storage';


export type Autenticacao = {
    usuario?: Usuario|null, 
    loading: boolean,
    setUsuario?: any

}

const ContextApp = createContext<Autenticacao>({loading: false});

export interface IContextAppProps {
    children: ReactNode
}

export function ContextAppProvider(props: IContextAppProps) {

    const [ usuario, _setUsuario ] = useState<Usuario|null>(null);
    const [ loading, isLoading ] = useState(false);
    //====================================================================
    const setUsuario = async(usuario: Usuario | null) => {
        console.log(usuario);
        if (usuario)
            AsyncStorage.setItem('usuario', JSON.stringify(usuario))
        else
            AsyncStorage.removeItem('usuario');
        _setUsuario(usuario);
    }
    // =========
    useEffect( () => {
        (async() => {
            const usuario = await AsyncStorage.getItem('usuario');
            if (usuario)
                _setUsuario(JSON.parse(usuario));
            isLoading(true);
        })()
    }, []);

    //====================================================================
    return (
        <ContextApp.Provider value={{usuario, setUsuario, loading}}>
            {props.children}
        </ContextApp.Provider>
    )
}

export const useContextApp = () => useContext(ContextApp)