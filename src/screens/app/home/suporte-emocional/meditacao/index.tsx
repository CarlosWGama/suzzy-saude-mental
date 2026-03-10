import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppFont } from "../../../../../themes/fonts";
import { AppButton } from "../../../../../themes/components/button";
import { AppColors } from "../../../../../themes/colors";
import PlayerMeditacao, { MeditacaoAudio } from "./player";
import { useAudioPlayer, AudioSource } from 'expo-audio';

export interface ModalProps {
    onBack():void;
}

function MeditacaoModal({onBack}: ModalProps) {

    const [ playNumber, setPlayNumber ] = useState(0);
    const [ audioSource, setAudioSource ] = useState<AudioSource | null>(null);
    const [ pausing, setPausing ] = React.useState<boolean>(false);

    // ================================================
    const audios: MeditacaoAudio[] = [
        {number: 1, title: "LIMPEZA DOS \nPENSAMENTOS NEGATIVOS", audio: require('./audios/meditacao1.mp3') },
        {number: 2, title: 'LIBERAR A ANSIEDADE', audio: require('./audios/meditacao2.mp3') },
        {number: 3, title: 'TRANQUILIZAR A MENTE', audio: require('./audios/meditacao3.mp3') },
        {number: 4, title: 'A FORÇA DA VIDA', audio: require('./audios/meditacao4.mp3') },
        {number: 5, title: 'AS 4 ESTAÇÕES', audio: require('./audios/meditacao5.mp3') },
    ]

    const player = useAudioPlayer(audioSource);

    // ==========
    const playHandle = async (number:number) => {
        stopHandle();
        setPlayNumber(number);
        const audioItem = audios.find(item => item.number == number);
        if (audioItem) {
            setAudioSource(audioItem.audio);
            player.play();
        }
    }
    // =========
    const stopHandle = () => {
        player.pause();
        player.seekTo(0);
        setPausing(false);
        setPlayNumber(0);
        setAudioSource(null);
    }

    // =========
    const playPauseHandle = () => {
        if (player.playing) {
            player.pause();
        } else {
            player.play();
        }
        setPausing(!pausing);
    }

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