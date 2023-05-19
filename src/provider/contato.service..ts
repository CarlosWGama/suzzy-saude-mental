import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api"
import { Usuario } from "../models/usuario";
import { Contato } from "../models/contato";


const ContatosService = {
    //Cadastra contato ao usuário logado
    cadastrar: async (data:any): Promise<{sucesso:boolean, erro?:any}> => {
        try {
            //const response = await api.post('/contatos', data);
            return {sucesso: true};
        } catch(e:any) {
            //console.log(e.response)
            return {sucesso:false, erro: e.response?.data?.message}
        }
    },
    
    //Busca a lista de contatos do usuário logado
    buscar: async(): Promise<{sucesso: boolean, contatos?:Contato[], erro?:any}> => {
        
        try {
            //const response = await api.get('/contatos');
            //console.log(response)
            const contatos: Contato[] = [
                {id: 1, nome: 'Carlos', telefone: '(82) 9 9999-9999', usuario_id: 1},
                {id: 2, nome: 'João', telefone: '(82) 9 9999-9999', usuario_id: 1},
            ];
            return {sucesso: true, contatos};
        } catch (e:any) {
            console.log(e);
            return {sucesso:false, erro: e.response?.data?.message}
        }
    },

    //Remove um contato do usuário
    remover: async (contatoID: number): Promise<{sucesso: boolean, erro?:any}> => {
        try {
            //const response = await api.delete(`/contato/${contatoID}`);
            return {sucesso: true};
        } catch (e:any) {
            return {sucesso:false, erro: e.response?.data?.message}
        }
    },
}

export const useContatosServices = () => ContatosService;