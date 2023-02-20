import { ReactNode, useRef, useState } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { Modalize } from "react-native-modalize";
import { ImgPersonagem6 } from "../../../assets/personagens";
import { AppColors } from "../../../themes/colors";
import { AppCard, AppSquareButton } from "../../../themes/components";
import { AppButton } from "../../../themes/components/button";
import { AppFont } from "../../../themes/fonts";
import AppTemplate from "../../../themes/layouts/template";
import SobreAppModal from "./app";
import CVVModal from "./cvv";

export default function HomeScreen() {

    const modal = useRef<Modalize>();
    const [ itemModal, setItemModal ] = useState<ReactNode>(null);


    const handleOpenModal = async (item: ReactNode) => {
        setItemModal(item);
        modal.current?.open()
    }   

    return (
        <AppTemplate titulo="Informações"
        
            fullComponent={
            <Modalize 
                adjustToContentHeight
                childrenStyle={{height: '85%'}}
                ref={modal}
                HeaderComponent={<AppButton title="FECHAR" color={AppColors.DANGER} onPress={() => modal.current?.close()}/>}    
            >
                {itemModal}
            </Modalize>}
        >
            
            {/* HEADER */}
            <AppCard style={{marginTop: -100}}>
                <View style={styles.card}>
                    <Image source={ImgPersonagem6} style={{height:150, width: 100, resizeMode: 'contain'}}/>
                    
                    <Text style={styles.cardText}>
                        Seja bem vindo! {"\n"}
                        Nessa seção do aplicativo você poderá conhecer um pouco sobre os cuidados e apoios que você pode encontrar em relação a sua saúde mental
                    </Text>
                </View>
            </AppCard>

            {/* OPÇÕES */}
            <Text style={styles.informacoes}>INFORMAÇÕES</Text>

            <ScrollView>
                <View style={styles.opcoes}>
                    <AppSquareButton title="APP" onPress={() => handleOpenModal(<SobreAppModal/>)} />
                    <AppSquareButton title="CVV"  onPress={() => handleOpenModal(<CVVModal/>)} />
                    <AppSquareButton title="Dicas" onPress={() => handleOpenModal(<CVVModal/>)} />
                    <AppSquareButton title="Termometro transtorno" textStyle={{fontSize: 12}} onPress={() => handleOpenModal(<CVVModal/>)}/>
                </View>
            </ScrollView>
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