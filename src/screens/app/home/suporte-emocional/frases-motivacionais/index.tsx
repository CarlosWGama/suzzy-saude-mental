import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppFont } from "../../../../../themes/fonts";
import { AppButton } from "../../../../../themes/components/button";
import { AppColors } from "../../../../../themes/colors";

export interface ModalProps {
    onBack():void;
}

function FrasesMotivacionaisModal({onBack}: ModalProps) {

    const [ index, setIndex ] = useState(0);
    const frases = [
        'Seja profundamente apaixonado pela vida. Pois a vida é um espetáculo imperdível \n(Augusto Cury).',
        'Que você tenha serenidade e calma para resolver as situações difíceis. Você é um vencedor e vai superar qualquer momento difícil \n(Autoria própria).',
        'Não sei exatamente pelo que você está passando, mas saiba que não está sozinho. Essa tempestade também vai passar! \n(Autor desconhecido)',
        'Acredite que você pode, assim você já estará no meio do caminho \n(Theodore Roosevelt).',
        'Tenha coragem! Porque ela é a alavanca propulsora para a realização de suas conquistas. Seja a sua melhor versão! O mundo te espera! Siga em frente \n(Autoria Própria).',
        'A coragem está a um passo à frente do medo. Acredite em você! \n(Coleman Young)',
        'Quando tudo parecer impossível, é sinal de que está precisando de uns bons dias de descanso para aliviar a pressão e liberar a sua mente. Depois, verá que os problemas nem eram tão grandes assim \n(Autor desconhecido).',
        'Confia em você mesmo. Você pode chegar onde deseja! Tenha suas armas: fé para vencer o desânimo, coragem para acabar com o medo, força para saltar os obstáculos, otimismo para vencer os pensamentos negativos e muito amor para espalhar sorrisos e fazer a diferença por onde você caminhar! (Verônica Medeiros)',
        'Por maior ou pior que seja o conflito, ele pode e dever ser enfrentado como uma oportunidade de crescimento, de desenvolvimento e de superação (Joel Beuter)',
        'Sorria para a vida, diga não à tristeza, ultrapasse seus limites, vença suas dificuldades, agradeça a Deus por viver e tenha um lindo e doce DIA! (Priscilla Rodighiero)',
        'Sem sonhos, a vida não tem brilho. Sem metas, os sonhos não têm alicerces. Sem prioridades, os sonhos não se tornam reais. Sonhe, trace metas, estabeleça prioridades e corra riscos para executar seus sonhos. Melhor é errar por tentar do que errar por se omitir! (Augusto Cury)',
        'Ser feliz não é ter uma vida perfeita. Mas usar as lágrimas para irrigar a tolerância. Usar as perdas para refinar a paciência. Usar as falhas para esculpir a serenidade. Usar a dor para lapidar o prazer. Usar os obstáculos para abrir as janelas da inteligência. (Augusto Cury)',
        'Quase tudo volta a funcionar se você desligar por alguns minutos... Incluindo você mesmo. (Anne Lamott)',
        'Faça novos planos. Repense suas prioridades. Mude o que for preciso. E recomece com a confiança de que tudo vai dar certo, do melhor jeito possível. (Fernanda Mello)',
        'Os médicos não vão deixar você saudável. Os nutricionistas não vão deixar você magro. Os professores não o tornarão inteligente. Os gurus não o acalmarão. Mentores não o tornarão rico. Os treinadores não vão fazer você caber. Em última análise, você deve assumir a responsabilidade. Cuide-se. (Naval Ravikant)',
        'O autocuidado é uma escolha deliberada de presentear-se com pessoas, lugares, coisas, eventos e oportunidades que recarregam nossa bateria pessoal e promovem a saúde integral: corpo, mente e espírito. (Laurie Buchanan)',
        'O modo como cuidamos de nós mesmos transmite mensagens ao nosso cérebro que moldam nosso valor próprio, de modo que devemos cuidar de nós mesmos de todas as maneiras, todos os dias. (Sam Owen)',
        'Pra que pressa, pra que correria, pra que tanto estresse, a vida é muito bonita para ser esquecida. Sim, vejo muitas pessoas deixando de viver, estão apenas sobrevivendo no meio de tanta agitação. Permita-se viver, curtir os momentos e saborear o melhor da vida enquanto ainda há tempo. Porquê depois, será tarde demais, e o arrependimento não trará o tempo de volta. (Scheila F. Scisloski)',
        'A vida é uma única chance e muito curta. Não perca seu tempo em brigas, estresse e decisões precipitadas quando só irá retardar seu crescimento espiritual e emocional... Viva a vida como tem que ser vivida, ame e seja amado, chore e ria mais, e seja sempre feliz. (Tiago Rodrigo)'
    ]
    // ================================================
    const selectPhrase = () => {
        const dia = new Date().getDate();
        setIndex(dia%frases.length);
    }

    // =======
    useEffect(() => {
       selectPhrase()
      }, []);

    //=================================================
    return (
        <View style={styles.container}>
            {/* HEADER */}
            <Text style={styles.title}>Frases Motivacionais</Text>
            <Text style={styles.description}>Sua frase hoje do dia é </Text>

            <Text style={styles.phrase}>{frases[index]} </Text>


            {/* BOTÃO VOLTAR */}
            <AppButton title="VOLTAR" color={AppColors.SUCCESS} onPress={onBack}/>
        </View>
    )
}

export default React.memo(FrasesMotivacionaisModal)

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
    },
    phrase: {
        fontSize: 20,
        marginVertical: 30,
        fontStyle: 'italic',
        textAlign: 'center'
    }
});