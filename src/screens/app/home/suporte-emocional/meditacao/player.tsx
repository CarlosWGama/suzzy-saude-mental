import React, { ReactNode } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AppFont } from '../../../../../themes/fonts';
import { MaterialIcons } from '@expo/vector-icons';
import { AppColors } from '../../../../../themes/colors';

export type MeditacaoAudio = {
    number: number,
    title: string,
    audio: any
}

export interface AppProps {
    item: MeditacaoAudio,
    playing: boolean,
    onPlay(number:number):void,
    onStop():void,
    onPlayPause(): void,
    pausing: boolean
}

function PlayerMeditacao({item, playing, onPlay, onStop, onPlayPause, pausing}: AppProps) {


    // ==========================================
    const ButtonPlayer = ({color, icon, onPress}:{color:string, icon: any, onPress: any}) => (
        <TouchableOpacity onPress={onPress}>
            <View style={[{backgroundColor:color}, styles.button]}>
                <MaterialIcons name={icon} color="white" size={30} />
            </View>
        </TouchableOpacity>
    )
    // ==========================================
    return (
        <View style={styles.container}>
            {/* TEXT */}
            <View style={{flexDirection:'row'}}>
                <Text style={styles.title}>MEDITAÇÃO {item.number} - </Text>
                <Text style={styles.description}>{item.title}</Text>
            </View>

            {/* BUTTON */}
            <View style={{flexDirection: 'row'}}>
                { playing && <ButtonPlayer color={AppColors.SECONDARY} icon={pausing ? 'play-circle-outline' : 'pause-circle-filled'} onPress={() => onPlayPause()}/>}
                { !playing && <ButtonPlayer color={AppColors.PRIMARY} icon="play-circle-outline" onPress={() => onPlay(item.number)}/>}
                { playing && <ButtonPlayer color={AppColors.DANGER} icon="stop" onPress={onStop}/>}
            </View>
        </View>
    )
}

export default React.memo(PlayerMeditacao)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        paddingVertical: 10
    },
    title: {
        fontFamily: AppFont.NEGRITO
    },
    description: {
        fontFamily: AppFont.PADRAO
    },
    button: {
        borderRadius: 5,
        padding: 3,
        marginHorizontal: 2
    }

});