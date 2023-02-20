import { createContext, ReactNode, useState, useContext } from 'react';
import { Usuario } from '../models/usuario';


export type Autenticacao = {
    usuario?: Usuario|null, 
    setUsuario?: any

}

const ContextApp = createContext<Autenticacao>({});

export interface IContextAppProps {
    children: ReactNode
}

export function ContextAppProvider(props: IContextAppProps) {

    const [ usuario, setUsuario ] = useState<Usuario|null>(null);


    return (
        <ContextApp.Provider value={{usuario, setUsuario}}>
            {props.children}
        </ContextApp.Provider>
    )
}

export const useContextApp = () => useContext(ContextApp)