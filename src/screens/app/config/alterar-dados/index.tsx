import { Formik } from "formik";
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { AppColors } from "../../../../themes/colors";
import { AppButton, AppCheck, AppSelect } from "../../../../themes/components";
import { AppFont } from "../../../../themes/fonts";
import AppTemplate from "../../../../themes/layouts/template";
import * as Yup from 'yup';
import { AppInput } from "../../../../themes/components/input";
import { useUsuariosService } from "../../../../provider/usuario.service";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavParamsRoot } from "../../../../navigation";
import Toast from 'react-native-toast-message';
import { useContextApp } from "../../../../provider/context";

export default function AlterarDadosScreen() {

    const usuarioService = useUsuariosService();
    const [ usuario, setUsuario ] = useState({})
    const nav = useNavigation<NativeStackNavigationProp<NavParamsRoot, "app">>();
    
    //=======================================================================================
    const handleAtualizar = async(dados: any) => {
        const resposta = await usuarioService.atualizar(dados);
        
        if (resposta.sucesso)    Toast.show({text1: 'Dados atualizados!'});
        else                     Toast.show({text1: 'Falha ao atualizar', text2: resposta.erro, type: 'error'})
    
    }
    //===========
    useEffect(() => {
        (async () => {
            const resposta = await usuarioService.buscarPerfil();
            
            if (resposta.sucesso) setUsuario(resposta.usuario)
            else nav.reset({index: 0, routes: [{name: 'login'}]})  //Usuário não está logado
        })()
    }, []);
    //=======================================================================================

    return (
    <AppTemplate smallHeader backButton titulo="Alterar Dados" background="abstract2" color={AppColors.TERTIARY}>
        <Text style={styles.text}>Altere seus dadods</Text>
 
        <Formik
                initialValues={usuario}
                enableReinitialize 
                validationSchema={Yup.object().shape({                
                    nome: Yup.string().required('Campo obrigatório'),
                    cpf: Yup.string().required('Campo obrigatório'),
                    telefone: Yup.string().required('Campo obrigatório'),
                    data_nascimento: Yup.string().required('Campo obrigatório'),
                })}
                onSubmit={handleAtualizar}
            >
                {({ values, handleChange, handleBlur, errors, touched, setFieldValue, handleSubmit, isSubmitting }) => (<View>
                    <ScrollView contentContainerStyle={{paddingBottom:100, paddingHorizontal: 20}}>
                        {/* NOME */}
                        <AppInput 
                            title="Nome" placeholder="Digite seu nome"  error={errors.nome} touched={touched.nome}
                            value={values.nome}
                            onBlur={handleBlur("nome")}
                            onChangeText={handleChange("nome")}/>
                        {/* SENHA */}
                        <AppInput 
                            title="Senha (Apenas informe a senha, caso deseje alterá-la)" placeholder="Digite sua senha"  error={errors.senha} touched={touched.senha}
                            onBlur={handleBlur("senha")}
                            senha
                            onChangeText={handleChange("senha")}/>
                        {/* TELEFONE */}
                        <AppInput 
                            title="Telefone para contato" placeholder="Digite seu telefone"  error={errors.telefone} touched={touched.telefone}
                            onBlur={handleBlur("telefone")}
                            keyboardType="decimal-pad"
                            value={values.telefone}
                            mask={['(',/\d/,/\d/,')',' ',/\d/,' ',/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/]}
                            onChangeText={handleChange("telefone")}/>
                        {/* CPF */}
                        <AppInput 
                            title="CPF (Essa informação é para te auxiliar numa crise)" placeholder="Digite seu cpf"  error={errors.cpf} touched={touched.cpf}
                            onBlur={handleBlur("cpf")}
                            keyboardType="decimal-pad"
                            value={values.cpf}
                            mask={[/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'-',/\d/,/\d/]}
                            onChangeText={handleChange("cpf")}/>
                        {/* DATA DE NASCIMENTO */}
                        <AppInput 
                            title="Data de Nascimento" placeholder="Digite sua data de nascimento"  error={errors.data_nascimento} touched={touched.data_nascimento}
                            onBlur={handleBlur("data_nascimento")}
                            value={values.data_nascimento}
                            mask={[/\d/,/\d/,'/',/\d/,/\d/,'/',/\d/,/\d/,/\d/,/\d/]}
                            keyboardType="decimal-pad"
                            onChangeText={handleChange("data_nascimento")}/>
                        {/* GENERO */}
                        <AppSelect 
                            onChange={handleChange('genero')}
                            title="Gênero"
                            selected={values.genero}
                            options={[
                                {label: 'Masculino', value:'masculino'},
                                {label: 'Feminino', value:'feminino'},
                                {label: 'Outro', value:'outros'},]}
                        />
                        {/* ESCOLARIDADE */}
                        <AppInput 
                            title="Escolaridade" placeholder="Informe sua escolaridade"  error={errors.escolaridade} touched={touched.escolaridade}
                            onBlur={handleBlur("escolaridade")}
                            value={values.escolaridade}
                            onChangeText={handleChange("escolaridade")}/>
                        {/* ZONA RESIDENCIAL */}
                        <AppSelect 
                            onChange={handleChange('zona_residencial')}
                            title="Zona Residêncial"
                            selected={values.zona_residencial}
                            options={[
                                {label: 'Urbana', value:'urbana'},
                                {label: 'Rural', value:'rural'},    
                            ]}
                        />
                        {/* ESTADO CIVIL */}
                        <AppSelect 
                            onChange={handleChange('estado_civil')}
                            title="Estado Cívil"
                            selected={values.estado_civil}
                            options={[
                                {label: 'Solteiro', value:'solteiro'},
                                {label: 'Casado', value:'casado'},    
                                {label: 'Separado', value:'separado'},    
                                {label: 'Divorciado', value:'divorciado'},    
                                {label: 'Viúvo', value:'viuvo'},    
                                {label: 'Não Informar', value:'nao_informar'},    
                            ]}
                        />
                        {/* ORIENTAÇÃO SEXUAL */}
                        <AppSelect 
                            onChange={handleChange('orientacao_sexual')}
                            title="Orientação Sexual"
                            selected={values.orientacao_sexual}
                            options={[
                                {label: 'Heterossexual', value:'heterossexual'},
                                {label: 'Homossexual', value:'homossexual'},    
                                {label: 'Bissexual', value:'bissexual'},    
                                {label: 'Outro', value:'outros'},    
                                {label: 'Não Informar', value:'nao_informar'}    
                            ]}
                        />
                        {/* PROBLEMA MENTAL */}
                        <AppCheck
                            title="Possui algum problema mental?"
                            onChange={(selected) => setFieldValue('problema_mental', selected)}
                            selected={values.problema_mental}
                        />
                        {/* ESCOLARIDADE */}
                        {values.problema_mental && <AppInput 
                            title="Quais problemas mentais?" placeholder="Informe seus problemas mentais"  error={errors.problema_mental_quais} touched={touched.problema_mental_quais}
                            onBlur={handleBlur("problema_mental_quais")}
                            value={values.problema_mental_quais}
                            onChangeText={handleChange("problema_mental_quais")}/>}
                        {/* PROBLEMA MENTAL */}
                        <AppCheck
                            title="Faz uso de medicamento?"
                            onChange={(selected) => setFieldValue('uso_medicamento', selected)}
                            selected={values.uso_medicamento}
                        />
                        {/* ESCOLARIDADE */}
                        {values.uso_medicamento && <AppInput 
                            title="Quais medicamentos?" placeholder="Informe seus medicamentos"  error={errors.uso_medicamento_quais} touched={touched.uso_medicamento_quais}
                            onBlur={handleBlur("uso_medicamento_quais")}
                            value={values.uso_medicamento_quais}
                            onChangeText={handleChange("uso_medicamento_quais")}/>}


                        <AppButton title="Atualizar" color={AppColors.TERTIARY} onPress={handleSubmit} />
                    </ScrollView>
                </View>)}
            </Formik>
            <Toast />


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
    }
});;