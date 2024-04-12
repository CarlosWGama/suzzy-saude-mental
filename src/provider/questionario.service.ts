import api from "./api"

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
    dias_seguidos: number
    dias_totais_aguados: number
}

const QuestionarioDiarioService = {
    //Cadastra questionario do usuario
    cadastro: async (data:any): Promise<{sucesso:boolean, planta?: PlantaRegada, erro?:any}> => {
        try {
            const response = await api.post('/questionarios', data);
            return {sucesso: true, planta: response.data.planta};
        } catch(e:any) {
            //console.log(e.response)
            return {sucesso:false, erro: e.response?.data?.message}
        }
    },

    //Busca o questionário do dia
    buscar: async (): Promise<{sintomas?:Sintomas, planta?: PlantaRegada, sucesso:boolean, erro?:any}> => {
        try {
            const response = await api.get('/questionarios');
            return { sucesso: true, sintomas: response.data.sintomas, planta: response.data.planta }
        } catch(e:any) {
            return {sucesso:false, erro: e.response?.data?.message}
        }
    },

}

export const useQuestionarioDiarioService = () => QuestionarioDiarioService;