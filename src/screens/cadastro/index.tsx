import { Formik } from "formik";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";
import { ImgPersonagem7, ImgPersonagem8, ImgPersonagem9 } from "../../assets/personagens";
import { AppColors } from "../../themes/colors";
import { AppBackButton, AppButton, AppInput } from "../../themes/components";
import { AppFont } from "../../themes/fonts";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavParamsRoot } from "../../navigation";
import * as Yup from 'yup';

export default function CadastroLogin() {

    const nav = useNavigation<NativeStackNavigationProp<NavParamsRoot, "login">>();

    const handleLogin = async () => {

    }


    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                <AppBackButton />
                <Text style={styles.title}>Realize o seu cadastro</Text>
            </View>
            <Image source={ImgPersonagem7} style={styles.img}/>
            
            {/* LOGIN */}
            <Formik
                initialValues={{email: '', senha: ''}}
                validationSchema={Yup.object().shape({
                    email: Yup.string().required('Campo obrigatório').email('O campo precisa ser um email'),
                    senha: Yup.string().required('Campo obrigatório').min(6, 'O campo precisa ter pelo menos 6 caracteres')
                })}
                onSubmit={handleLogin}
            >
                {({ handleChange, handleBlur, errors, touched, handleSubmit, isSubmitting }) => (<View style={styles.loginContainer}>
                    <AppInput 
                        title="Email" placeholder="Digite seu email"  error={errors.email} touched={touched.email}
                        onBlur={handleBlur("email")}
                        onChangeText={handleChange("email")}/>

                    <AppButton title="CADASTRAR" color={AppColors.SUCCESS} onPress={handleSubmit} />
                </View>)}
            </Formik>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: AppColors.PRIMARY,
        paddingTop: 30,
    },
    img: {
        height: 200, 
        resizeMode: 'contain', 
        marginBottom: -22, 
        transform: [{scaleX: -1}]
    },
    title: {
        fontFamily: AppFont.NEGRITO,
        fontSize: 20,
        marginRight: 20,
        textAlign: 'right'
    },
    loginContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopEndRadius: 50,
        padding: 50,

        
    },
});