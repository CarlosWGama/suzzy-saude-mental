import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api"


const UsuariosService = {
    //Cadastra usuário
    cadastro: async (data:any): Promise<{sucesso:boolean, usuario?:any, erro?:any}> => {
        try {
            const response = await api.post('/usuarios', data);
            return {sucesso: true, usuario: response.data};
        } catch(e:any) {
            //console.log(e.response)
            return {sucesso:false, erro: e.response?.data?.message}
        }
    },
    
    //Login
    login: async(email:string, senha:string): Promise<{sucesso: boolean, jwt?: string, usuario?:any, erro?:any}> => {
        console.log('A');
        try {
            console.log('B');
            const response = await api.post('/usuarios/login', {email, senha});
            console.log('C');
            await AsyncStorage.setItem('jwt', response.data.jwt)
            console.log(response)
            return {sucesso: true, jwt:response.data.jwt, usuario: response.data.usuario};
        } catch (e:any) {
            console.log(e);
            return {sucesso:false, erro: e.response?.data?.message}
        }
    },

    //Desloga o usuário
    logout: async() => {
        AsyncStorage.removeItem('jwt');
    }
}

export const useUsuariosService = () => UsuariosService;