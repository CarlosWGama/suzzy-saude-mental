import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export interface RangeProps {
    selected: number|null,
    onSelect(sentimento: number):any
}

function Range ({ selected, onSelect }: RangeProps) {
    return (
      <View style={styles.container}>
        {/* FELIZ */}
        <TouchableOpacity onPress={() => onSelect(5)}>
            <Image source={require('./../../../../../assets/emojis/5-feliz.png')} style={[styles.image, { opacity: (selected == 5 ? 1 : 0.2)}]} />
        </TouchableOpacity>

        {/* BEM */}
        <TouchableOpacity onPress={() => onSelect(4)}>
            <Image source={require('./../../../../../assets/emojis/4-bem.png')} style={[styles.image, { opacity: (selected == 4 ? 1 : 0.2)}]} />
        </TouchableOpacity>
        
        {/* NEUTRO */}
        <TouchableOpacity onPress={() => onSelect(3)}>
            <Image source={require('./../../../../../assets/emojis/3-neutro.png')} style={[styles.image, { opacity: (selected == 3 ? 1 : 0.2)}]} />
        </TouchableOpacity>
        
        {/* TRISTE */}
        <TouchableOpacity onPress={() => onSelect(2)}>
            <Image source={require('./../../../../../assets/emojis/2-triste.png')} style={[styles.image, { opacity: (selected == 2 ? 1 : 0.2)}]} />
        </TouchableOpacity>
        
        {/* PESSIMO */}
        <TouchableOpacity onPress={() => onSelect(1)}>
            <Image source={require('./../../../../../assets/emojis/1-pessimo.png')} style={[styles.image, { opacity: (selected == 1 ? 1 : 0.2)}]} />
        </TouchableOpacity>
      </View>
    );
}

export default React.memo(Range)

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    image: {
        width: 60,
        height: 60,
        marginBottom: 20
    }
});