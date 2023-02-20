import { Formik } from "formik";
import { StyleSheet, Text, View } from "react-native";
import { AppColors } from "../../../../themes/colors";
import { AppButton } from "../../../../themes/components";
import { AppFont } from "../../../../themes/fonts";
import AppTemplate from "../../../../themes/layouts/template";
import * as Yup from 'yup';
import { AppInput } from "../../../../themes/components/input";

export default function AlterarDadosScreen() {

    const handleSubmit = async(dados: any) => {

    }

    return (
    <AppTemplate smallHeader backButton titulo="Alterar Dados" background="abstract2" color={AppColors.TERTIARY}>
        <Text style={styles.text}>Altere seus dadods</Text>

        <Formik
            initialValues={{nome: ''}}
            onSubmit={handleSubmit}
            validationSchema={Yup.object({
                nome: Yup.string().required('Campo obrigatório')
            })}
        >
            {({handleChange, handleSubmit, errors, handleBlur, touched, isSubmitting}) => (
                <>
                    <AppInput placeholder="Digite seu nome" title="Nome" onChangeText={handleChange('nome')} onBlur={handleBlur('nome')} error={errors.nome} touched={touched.nome} />
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