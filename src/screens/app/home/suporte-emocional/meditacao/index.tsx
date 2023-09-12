import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppFont } from "../../../../../themes/fonts";
import { AppButton } from "../../../../../themes/components/button";
import { AppColors } from "../../../../../themes/colors";
import PlayerMeditacao, { MeditacaoAudio } from "./player";
import { Audio } from 'expo-av';

export interface ModalProps {
    onBack():void;
}

function MeditacaoModal({onBack}: ModalProps) {

    const [ playNumber, setPlayNumber ] = useState(0);
    const [ sound, setSound ] = React.useState<Audio.Sound|null>(null);
    const [ pausing, setPausing ] = React.useState<boolean>(false);

    // ================================================
    const audios: MeditacaoAudio[] = [
        {number: 2, title: 'LIBERAR A ANSIEDADE', audio: require('./audios/meditacao2.mp3') },
        {number: 3, title: 'TRANQUILIZAR A MENTE', audio: require('./audios/meditacao3.mp3') },
    ]
    // ==========
    const playHandle = async (number:number) => {
        await stopHandle();
        setPlayNumber(number);
        const audio = audios.find(item => item.number == number)
        const { sound } = await Audio.Sound.createAsync(audio?.audio)
        setSound(sound);
        await sound.playAsync();
    }
    // =========
    const stopHandle = async () => {
        await sound?.stopAsync();
        setPausing(false);
        setPlayNumber(0);
    }

    // =========
    const playPauseHandle = async () => {
        if (sound) 
            !pausing ? await sound.pauseAsync() : await sound.playAsync();
        
        setPausing(!pausing);
    }

    // ========
    useEffect(() => {
        stopHandle();
    }, [])
    // =======
    useEffect(() => {
        return sound
          ? () => {
              console.log('Fecha o áudio ao fechar a janela');
              sound.unloadAsync();
            }
          : undefined;
      }, []);

    //=================================================
    return (
        <View style={styles.container}>
            {/* HEADER */}
            <Text style={styles.title}>Meditações</Text>
            <Text style={styles.description}>As meditações a seguir podem te ajudar a desacelar</Text>
            
            {/* AUDIOS */}
            {audios.map(audio => (
                <PlayerMeditacao    
                    key={audio.number} 
                    item={audio} 
                    playing={audio.number == playNumber } 
                    pausing={pausing}
                    onStop={stopHandle} 
                    onPlay={playHandle}
                    onPlayPause={playPauseHandle}    
                />
            ))}

            {/* BOTÃO VOLTAR */}
            <AppButton title="VOLTAR" color={AppColors.SUCCESS} onPress={() => {
                stopHandle()
                onBack()
            }}/>
        </View>
    )
}

export default React.memo(MeditacaoModal)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 20
    },
    title: {
        fontFamily: AppFont.NEGRITO,
        textAlign: 'center',
        marginBottom: 10
    },
    description: {
        fontFamily: AppFont.PADRAO,
        textAlign: 'center'
    }
});