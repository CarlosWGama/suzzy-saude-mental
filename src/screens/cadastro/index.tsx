import { Formik } from "formik";
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { ImgPersonagem7, ImgPersonagem8, ImgPersonagem9 } from "../../assets/personagens";
import { AppColors } from "../../themes/colors";
import { AppBackButton, AppButton, AppInput } from "../../themes/components";
import { AppFont } from "../../themes/fonts";
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavParamsRoot } from "../../navigation";
import * as Yup from 'yup';
import { AppSelect } from "../../themes/components/select";
import { AppCheck } from "../../themes/components/check";
import { useUsuariosService } from "../../provider/usuario.service";
import Toast from 'react-native-toast-message';

export default function CadastroLogin() {

    const nav = useNavigation<NativeStackNavigationProp<NavParamsRoot, "login">>();
    const usuarioService = useUsuariosService();

    //=======================================================================================
    const handleCadastro = async (dados:any) => {

        const resposta = await usuarioService.cadastro(dados)
        console.log(resposta)
        if (resposta.sucesso) {
            Toast.show({type:'success', text1: 'Cadastrado com sucesso'});
            nav.goBack();
        } else {
            Toast.show({type: 'error', text1: 'Falha ao cadastrar', text2: resposta.erro});
        }  
    }
    //=======================================================================================
    return (
        <View style={styles.container}>
            {/* HEADER */}
            <View style={{flexDirection:'row', justifyContent: 'space-between'}}>
                <AppBackButton />
                <Text style={styles.title}>Realize o seu cadastro</Text>
            </View>
            <Image source={ImgPersonagem7} style={styles.img}/>
            
            {/* FORMULÁRIO */}
            <Toast />

            <Formik
                initialValues={{email: '', senha: '', nome: '', cpf: '', telefone: '', data_nascimento: '', genero: '1', escolaridade:'', zona_residencial:'1', estado_civil: '1', orientacao_sexual: '1', problema_mental: false, problema_mental_quais: '', uso_medicamento: false, uso_medicamento_quais: '' }}
                validationSchema={Yup.object().shape({
                    email: Yup.string().required('Campo obrigatório').email('O campo precisa ser um email'),
                    senha: Yup.string().required('Campo obrigatório').min(6, 'O campo precisa ter pelo menos 6 caracteres'),
                    nome: Yup.string().required('Campo obrigatório'),
                    cpf: Yup.string().required('Campo obrigatório'),
                    telefone: Yup.string().required('Campo obrigatório'),
                    data_nascimento: Yup.string().required('Campo obrigatório'),
                })}
                onSubmit={handleCadastro}
            >
                {({ values, handleChange, handleBlur, errors, touched, setFieldValue, handleSubmit, isSubmitting }) => (<View style={styles.loginContainer}>
                    <ScrollView contentContainerStyle={{padding:50}}>
                        {/* NOME */}
                        <AppInput 
                            title="Nome" placeholder="Digite seu nome"  error={errors.nome} touched={touched.nome}
                            onBlur={handleBlur("nome")}
                            onChangeText={handleChange("nome")}/>
                        {/* EMAIL */}
                        <AppInput 
                            title="Email" placeholder="Digite seu email"  error={errors.email} touched={touched.email}
                            onBlur={handleBlur("email")}
                            keyboardType='email-address'
                            onChangeText={handleChange("email")}/>
                        {/* SENHA */}
                        <AppInput 
                            title="Senha" placeholder="Digite sua senha"  error={errors.senha} touched={touched.senha}
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
                                {label: 'Masculino', value:'1'},
                                {label: 'Feminino', value:'2'},
                                {label: 'Outro', value:'0'},]}
                        />
                        {/* ESCOLARIDADE */}
                        <AppInput 
                            title="Escolaridade" placeholder="Informe sua escolaridade"  error={errors.escolaridade} touched={touched.escolaridade}
                            onBlur={handleBlur("escolaridade")}
                            onChangeText={handleChange("escolaridade")}/>
                        {/* ZONA RESIDENCIAL */}
                        <AppSelect 
                            onChange={handleChange('zona_residencial')}
                            title="Zona Residêncial"
                            selected={values.zona_residencial}
                            options={[
                                {label: 'Urbana', value:'1'},
                                {label: 'Rural', value:'2'},    
                            ]}
                        />
                        {/* ESTADO CIVIL */}
                        <AppSelect 
                            onChange={handleChange('estado_civil')}
                            title="Estado Cívil"
                            selected={values.estado_civil}
                            options={[
                                {label: 'Solteiro', value:'1'},
                                {label: 'Casado', value:'2'},    
                                {label: 'Separado', value:'3'},    
                                {label: 'Divorciado', value:'4'},    
                                {label: 'Viúvo', value:'5'},    
                                {label: 'Não Informar', value:'6'},    
                            ]}
                        />
                        {/* ORIENTAÇÃO SEXUAL */}
                        <AppSelect 
                            onChange={handleChange('orientacao_sexual')}
                            title="Orientação Sexual"
                            selected={values.orientacao_sexual}
                            options={[
                                {label: 'Heterossexual', value:'1'},
                                {label: 'Homossexual', value:'2'},    
                                {label: 'Bissexual', value:'3'},    
                                {label: 'Outro', value:'4'},    
                                {label: 'Não Informar', value:'5'}    
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
                            onChangeText={handleChange("uso_medicamento_quais")}/>}


                        <AppButton title="CADASTRAR" color={AppColors.SUCCESS} onPress={handleSubmit} />
                    </ScrollView>
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
        // padding: 50,

        
    },
});