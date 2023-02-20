import { Formik } from "formik";
import { StyleSheet, Text, View } from "react-native";
import { AppColors } from "../../../../themes/colors";
import { AppButton } from "../../../../themes/components";
import { AppFont } from "../../../../themes/fonts";
import AppTemplate from "../../../../themes/layouts/template";
import * as Yup from 'yup';
import { AppInput } from "../../../../themes/components/input";
import { Masks } from 'react-native-mask-input';

export default function AlterarContatoScreen() {

    const handleSubmit = async(dados: any) => {

    }

    return (
    <AppTemplate smallHeader backButton titulo="Alterar Senha" background="abstract2" color={AppColors.TERTIARY}>
        <Text style={styles.text}>Altere sua senha</Text>

        <Formik
            initialValues={{nome: '', telefone: ''}}
            onSubmit={handleSubmit}
            validationSchema={Yup.object({
                nome: Yup.string().required('Campo obrigatório'),
                telefone: Yup.string().required('Campo obrigatório')
            })}
        >
            {({handleChange, values, handleSubmit, errors, handleBlur, touched, isSubmitting}) => (
                <>
                    <AppInput placeholder="Digite o nome do seu contato" title="Nome contato" onChangeText={handleChange('nome')} onBlur={handleBlur('nome')} error={errors.nome} touched={touched.nome} />
                    <AppInput mask={Masks.BRL_PHONE} value={values.telefone} placeholder="Digite o telefone" title="Número do telefone" onChangeText={handleChange('telefone')} onBlur={handleBlur('telefone')} error={errors.telefone} touched={touched.telefone} />
                    <AppButton title="Salvar"  color={AppColors.TERTIARY} onPress={handleSubmit} carregando={isSubmitting}  />
                </>
            )}
        </Formik>

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