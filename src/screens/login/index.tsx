import { Formik } from "formik";
import { ActivityIndicator, Image, StyleSheet, Text, TextInput, View } from "react-native";
import { ImgPersonagem7, ImgPersonagem8, ImgPersonagem9 } from "../../assets/personagens";
import { AppColors } from "../../themes/colors";
import { AppButton, AppInput } from "../../themes/components";
import { AppFont } from "../../themes/fonts";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavParamsRoot } from "../../navigation";
import * as Yup from 'yup';
import { useContextApp } from "../../provider/context";
import { useUsuariosService } from "../../provider/usuario.service";
import Toast from 'react-native-toast-message';
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {

    const nav = useNavigation<NativeStackNavigationProp<NavParamsRoot, "login">>();
    const  { setUsuario } = useContextApp();
    const usuarioService = useUsuariosService();

    //=======================================================================================
    const handleLogin = async ({email, senha}:any) => {

        const response = await usuarioService.login(email, senha);

        if (response.sucesso) {
            setUsuario(response.usuario)
            nav.reset({index: 0, routes: [{name: 'app'}]})
        } else {
            Toast.show({type:'error', text1: 'Usuário ou senha incorreta'});
        }
    }

    //=======================================================================================
    return (
        <View style={styles.container}>
            <SafeAreaView style={{flex: 1}}>
            {/* HEADER */}
            <Text style={styles.title}>Realize o seu acesso</Text>
            <Image source={ImgPersonagem7} style={styles.img}/>
            <Toast />
            
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

                    <AppInput 
                        title="Senha" placeholder="Digite sua senha" senha   error={errors.senha} touched={touched.senha}
                        onBlur={handleBlur("senha")}
                        onChangeText={handleChange("senha")}/>
                

                    <AppButton title="ACESSAR" onPress={handleSubmit} carregando={isSubmitting} />
                    <AppButton title="NÃO POSSUI CONTA? CLIQUE AQUI!"  outline onPress={() => nav.push("cadastro")} />
                    <AppButton title="ACESSAR SEM CONTA" color={AppColors.SECONDARY}  outline onPress={() => nav.reset({index: 0, routes: [{name:'app'}]})} />
                </View>)}
            </Formik>
            </SafeAreaView>
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
    },
    title: {
        fontFamily: AppFont.NEGRITO,
        fontSize: 20,
        marginLeft: 20
    },
    loginContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopStartRadius: 50,
        padding: 50,

        
    },
});