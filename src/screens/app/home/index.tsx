import { ReactNode, useRef, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { Modalize } from "react-native-modalize";
import { ImgPersonagem9 } from "../../../assets/personagens";
import { useContextApp } from "../../../provider/context";
import { AppColors } from "../../../themes/colors";
import { AppCard, AppSquareButton } from "../../../themes/components";
import { AppButton } from "../../../themes/components/button";
import { AppFont } from "../../../themes/fonts";
import AppTemplate from "../../../themes/layouts/template";
import SobreAppModal from "./app";
import SuporteEmocionalModal from "./suporte-emocional";
import ApoioEmergencialModal from "./apoio-emergencial";
import DoencasMentaisModal from "./doencas-mentais";
import TermoMentalModal from "./termomental";

export default function HomeScreen() {

    const modal = useRef<Modalize>();
    const  { usuario } = useContextApp();
    const [ itemModal, setItemModal ] = useState<ReactNode>(null);

    //=======================================================================================
    const handleOpenModal = async (item: ReactNode) => {
        setItemModal(item);
        modal.current?.open()
    }   
    //=======================================================================================
    return (
        <AppTemplate titulo="Informações"
        
            fullComponent={
            <Modalize 
                adjustToContentHeight
                modalTopOffset={80}
                modalStyle={{flex: 1}}
                disableScrollIfPossible={false}
                ref={modal}
                HeaderComponent={<AppButton title="FECHAR" color={AppColors.DANGER} onPress={() => modal.current?.close()}/>}    
            >
                {itemModal}
            </Modalize>}
        >
            
            {/* HEADER */}
            <AppCard style={{marginTop: -100}}>
                <View style={styles.card}>
                    <Image source={ImgPersonagem9} style={{height:150, width: 100, resizeMode: 'contain'}}/>
                    
                    <Text style={styles.cardText}>
                        Seja bem vindo(a) {usuario?.nome}! {"\n\n"}
                        Nessa seção do aplicativo você poderá conhecer um pouco sobre os cuidados e apoios que você pode encontrar em relação a sua saúde mental.
                    </Text>
                </View>
            </AppCard>

            {/* OPÇÕES */}
            <Text style={styles.informacoes}>INFORMAÇÕES</Text>

            <View style={styles.opcoes}>
                <AppSquareButton title={"Doenças \nMentais"} textStyle={{fontSize: 12}} onPress={() => handleOpenModal(<DoencasMentaisModal/>)} />
                { usuario && <AppSquareButton title="Registros Diários"  onPress={() => handleOpenModal(<ApoioEmergencialModal/>)} />}
                <AppSquareButton title={"Apoio \nEmergencial"} textStyle={{fontSize: 12}}   onPress={() => handleOpenModal(<ApoioEmergencialModal/>)} />
                { usuario && <AppSquareButton title="Suporte Emocional" onPress={() => handleOpenModal(<SuporteEmocionalModal/>)} />}
                <AppSquareButton title="TermoMental" textStyle={{fontSize: 12}} onPress={() => handleOpenModal(<TermoMentalModal/>)}/>
            </View>
        </AppTemplate> 
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardText: {
        fontFamily: AppFont.PADRAO,
        fontSize: 17,
        textAlign: 'justify',
        width: 200
    },
    informacoes: {
        fontFamily: AppFont.NEGRITO,
        marginTop: 30
    },
    opcoes: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    }

});