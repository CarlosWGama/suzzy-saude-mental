import { StyleSheet, Text, View } from "react-native";
import { AppColors } from "../../../themes/colors";
import AppTemplate from "../../../themes/layouts/template";

export default function AjudaScreen() {
    return (
        <AppTemplate titulo="Ajuda" background="abstract" color={AppColors.SECONDARY}>
            <Text>Olá mundo</Text>
        </AppTemplate>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    }
});