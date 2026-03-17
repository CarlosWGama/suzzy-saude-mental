import { PedidoAjuda } from "../models/ajuda.enum";
import api from "./api"


const AjudaService = {
    //Informa a central uma tentativa de pedido de ajuda
    cadastro: async (origem:PedidoAjuda, localizacao?: any): Promise<{sucesso:boolean, pedido?:any, erro?:any}> => {
        try {
            //Converte para o valor numerico
            origem = origem as number;
            let data:any = {origem};
            if(localizacao) 
                data = {...data, latitude: localizacao.coords.latitude, longitude: localizacao.coords.longitude};
            console.log(data);
            //Envia
            const response = await api.post('/pedidos-ajudas', data);
            console.log(response);
            return {sucesso: true};
        } catch(e:any) {
            //console.log(e.response)
            return {sucesso:false, erro: e.response?.data?.message}
        }
    },
    
}

export const useAjudaService = () => AjudaService;