import { useEffect, useState, useRef } from 'react';
import { Formik } from "formik";
import { Alert, StyleSheet, Text, View } from "react-native";
import { AppColors } from "../../../../themes/colors";
import { AppButton, AppSelect } from "../../../../themes/components";
import { AppFont } from "../../../../themes/fonts";
import AppTemplate from "../../../../themes/layouts/template";
import * as Yup from 'yup';
import { AppInput } from "../../../../themes/components/input";
import { Masks } from 'react-native-mask-input';
import { Contato } from "../../../../models/contato";
import { useContatosServices } from '../../../../provider/contato.service.';
import Toast from 'react-native-toast-message';
import { Modalize } from 'react-native-modalize';

export default function AlterarContatoScreen() {

    const contatosServices = useContatosServices();
    const [ contatos, setContatos ] = useState<Contato[]>([])
    const modal = useRef<Modalize>(null);

    // ====================================================================
    const buscarContatos = async () => {
        //Busca os contatos do usuário
        const resultado = await contatosServices.buscar()
        if (resultado.sucesso)
            setContatos(resultado.contatos)
    }
    // ===
    const handleExcluir = async(contato: Contato) => {
        Alert.alert('Remover contato', `Deseja realmente remover ${contato.nome} (${contato.telefone}) da sua lista de contatos?`, [
            {text: 'Cancelar'},
            {text: 'Confirmar', onPress: async() => {
                //@ts-ignore
                console.log(contato.id)
                await contatosServices.remover(contato.id)
                buscarContatos();
                Toast.show({text1: 'Removido com sucesso'})
            }}
        ])
    }
    //===
    const handleCadastrar = async(dados: any) => {
        modal.current?.close()
        const resposta = await contatosServices.cadastrar(dados)
        console.log(resposta)
        if (resposta.sucesso) {
            Toast.show({text1: 'Contato cadastrado com sucesso'});
            buscarContatos()
        } else
            Toast.show({text1: 'Houve uma falha ao cadastrar o usuário', text2: resposta.erro});
    }
    // === 
    const handleAbrirModal = async () => {
        modal.current?.open()
    }
    // ===
    useEffect(() => {
        //Busca os contatos do usuário
        buscarContatos()
    }, [])
    // ====================================================================
    return (
    <AppTemplate smallHeader backButton titulo="Contatos" background="abstract2" color={AppColors.TERTIARY}>
        <Text style={styles.text}>Altere seus contatos</Text>

        <Toast />
        {/* CONTATOS */}
        { contatos.map((contato, index) => (
            <View style={styles.contatos} key={index}>
                <Text style={styles.contatoText}>{contato.nome}</Text>
                <Text style={styles.contatoText}>{contato.telefone}</Text>
                <AppButton title='Excluir' color="tomato" onPress={() => handleExcluir(contato)} />
            </View>
        ))}

        { contatos.length < 3 &&<AppButton title="Adicionar novo contato"  color={AppColors.TERTIARY} onPress={handleAbrirModal}  />}

        {/* MODAL */}
        <Modalize ref={modal} childrenStyle={{padding: 20}} modalTopOffset={100}>
            <Formik
                initialValues={{nome: '', telefone: '', relacionamento:'1'}}
                onSubmit={handleCadastrar}
                validationSchema={Yup.object({
                    nome: Yup.string().required('Campo obrigatório'),
                    telefone: Yup.string().required('Campo obrigatório')
                })}
            >
                {({handleChange, values, handleSubmit, errors, handleBlur, touched, isSubmitting}) => (
                    <>
                        <AppInput placeholder="Digite o nome do seu contato" title="Nome contato de referência" onChangeText={handleChange('nome')} onBlur={handleBlur('nome')} error={errors.nome} touched={touched.nome} />
                        <AppInput mask={Masks.BRL_PHONE} value={values.telefone} placeholder="Digite o telefone com DDD" title="Número do telefone com DDDe" onChangeText={handleChange('telefone')} onBlur={handleBlur('telefone')} error={errors.telefone} touched={touched.telefone} />
                        <AppSelect 
                            onChange={handleChange('relacionamento')}
                            title="Grau de Referência"
                            selected={values.relacionamento}
                            options={[
                                {label: 'Pai', value:'1'},
                                {label: 'Mãe', value:'2'},
                                {label: 'Irmã(o)', value:'3'},
                                {label: 'Amigo(a)', value:'4'},
                                {label: 'Parente', value:'5'},
                                {label: 'Outro', value:'6'},
                            ]}
                        />
                        <AppButton title="Adicionar"  color={AppColors.TERTIARY} onPress={handleSubmit} carregando={isSubmitting}  />
                    </>
                )}
            </Formik>
        </Modalize>

    </AppTemplate>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
    text: {
        margin: 30,
        textAlign: 'center',
        fontFamily: AppFont.NEGRITO,
        fontSize: 20
    },

    contatos: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: 'lightgrey',
        borderBottomWidth: 1
    },
    contatoText: {
        fontFamily: AppFont.NEGRITO,
        fontSize: 12,
    }

});;