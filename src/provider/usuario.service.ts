import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api"
import { Usuario } from "../models/usuario";


const UsuariosService = {
    //Cadastra usuário
    cadastro: async (data:any): Promise<{sucesso:boolean, usuario?:any, erro?:any}> => {
        try {
            console.log(data);
            const response = await api.post('/usuarios', data);
            return {sucesso: true, usuario: response.data};
        } catch(e:any) {
            //console.log(e.response)
            return {sucesso:false, erro: e.response?.data?.message}
        }
    },
    
    //Login
    login: async(email:string, senha:string): Promise<{sucesso: boolean, jwt?: string, usuario?:any, erro?:any}> => {
        
        try {
            const response = await api.post('/login', {email, senha});
            await AsyncStorage.setItem('jwt', response.data.jwt)
            console.log(response)
            return {sucesso: true, jwt:response.data.jwt, usuario: response.data.usuario};
        } catch (e:any) {
            console.log(e);
            return {sucesso:false, erro: e.response?.data?.message}
        }
    },

    //Buscar dados do usuário
    buscarPerfil: async (): Promise<{sucesso: boolean, usuario?:any, erro?:any}> => {
        try {
            const response = await api.get('/usuarios');
            
            const usuario = {
                nome: response.data.nome,
                email: response.data.email,
                ...response.data.extras
            }
            console.log(usuario);
            return {sucesso: true, usuario};
        } catch (e:any) {
            return {sucesso:false, erro: e.response?.data?.message}
        }
    },

    //Atualiza dados do usuario
    atualizar: async (usuario: Usuario): Promise<{sucesso: boolean, erro?: any}> => {
        try {
            //O servidor busca o id do usuário autenticado
            delete usuario.id;
            delete usuario.email;
            await api.put(`/usuarios`, usuario);
            return {sucesso: true};
        } catch(e:any) {
            //console.log(e.response)
            return {sucesso:false, erro: e.response?.data?.message}
        }
    },

    //Desloga o usuário
    logout: async() => {
        AsyncStorage.removeItem('jwt');
    },

    //Desloga o usuário
    excluir: async(): Promise<{sucesso: boolean}> => {
        try {
            await api.delete(`/usuarios`);
            AsyncStorage.removeItem('jwt');
            return { sucesso: true}
        } catch(e: any) {
            return { sucesso: false}
        }

    }
}

export const useUsuariosService = () => UsuariosService;