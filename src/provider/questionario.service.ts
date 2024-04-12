import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api"
import moment from "moment";


export type Sintomas = {
    id?: number|null
    tristeza: null|number,
    choro: null|number,
    medo: null|number,
    desconcentracao: null|number,
    nauseas: null|number,
    insonia: null|number,
    higiene: null|number,
    isolamento: null|number
}

export type PlantaRegada = {
    dias_aguado: number
}

const QuestionarioDiarioService = {
    //Cadastra questionario do usuario
    cadastro: async (data:any): Promise<{sucesso:boolean, planta?: PlantaRegada, erro?:any}> => {
        try {
            //const response = await api.post('/questionario', data);
            //return {sucesso: true, usuario: response.data};
            return { sucesso: true, planta: { dias_aguado: 20 }};
        } catch(e:any) {
            //console.log(e.response)
            return {sucesso:false, erro: e.response?.data?.message}
        }
    },

    //Busca o questionário do dia
    buscar: async (): Promise<{sintomas?:Sintomas, planta?: PlantaRegada, sucesso:boolean, erro?:any}> => {
        try {
            const data = moment().format('YYYY-MM-DD');
            //const response = await api.get('/questionario/'+data);
            //return {sucesso: true, sintomas: response.data};
            return { sucesso: true, sintomas: {
                id: null,
                tristeza: null,
                choro: null,
                medo: null,
                desconcentracao: null,
                nauseas: null,
                insonia: null,
                higiene: null,
                isolamento: null
            }}
        } catch(e:any) {
            //console.log(e.response)
            return {sucesso:false, erro: e.response?.data?.message}
        }
    },

}

export const useQuestionarioDiarioService = () => QuestionarioDiarioService;