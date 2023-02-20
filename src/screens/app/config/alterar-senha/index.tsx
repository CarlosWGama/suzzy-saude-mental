import { Formik } from "formik";
import { StyleSheet, Text, View } from "react-native";
import { AppColors } from "../../../../themes/colors";
import { AppButton } from "../../../../themes/components";
import { AppFont } from "../../../../themes/fonts";
import AppTemplate from "../../../../themes/layouts/template";
import * as Yup from 'yup';
import { AppInput } from "../../../../themes/components/input";

export default function AlterarSenhaScreen() {

    const handleSubmit = async(dados: any) => {

    }

    return (
    <AppTemplate smallHeader backButton titulo="Alterar Senha" background="abstract2" color={AppColors.TERTIARY}>
        <Text style={styles.text}>Altere sua senha</Text>

        <Formik
            initialValues={{senha: '', senha2: ''}}
            onSubmit={handleSubmit}
            validationSchema={Yup.object({
                senha: Yup.string().required('Campo obrigatório').min(6, 'Senha precisa ter 6 caracteres'),
                senha2: Yup.string().oneOf([Yup.ref('senha'), ''], 'As senhas não batem').required('Campo obrigatório').min(6, 'Senha precisa ter 6 caracteres')
            })}
        >
            {({handleChange, handleSubmit, errors, handleBlur, touched, isSubmitting}) => (
                <>
                    <AppInput placeholder="Digite sua senha" title="Senha" senha onChangeText={handleChange('senha')} onBlur={handleBlur('senha')} error={errors.senha} touched={touched.senha} />
                    <AppInput placeholder="Digite sua senha novamente" title="Confirme sua senha" senha onChangeText={handleChange('senha2')} onBlur={handleBlur('senha2')} error={errors.senha2} touched={touched.senha2} />
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