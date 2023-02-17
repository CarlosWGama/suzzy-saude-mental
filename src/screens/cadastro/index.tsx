import { StyleSheet, Text, View } from "react-native";

export default function CadastroScreen() {
    return (
        <View style={styles.container}>
            <Text>Olá mundo</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    }
});