import { StyleSheet, View, Text } from "react-native"
import colors from "../config/colors"

export function Greeting() {
    return (
        <View style={styles.container}>
            <View style={{width: "81%"}}>
                <Text style={styles.text}>
                    Мета гри - вгадати чотиризначне число. Всі цифри мають бути різними. Кількість <Text style={styles.accent}>биків</Text> означає кількість вгаданих цифр на правильних позиціях, кількість <Text style={styles.accent}>корів</Text> - кількість вгаданих цифр не на своїх позиціях. Нумо грати!  
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
        paddingHorizontal: 10,
        alignItems: "center"
    },
    text: {
        fontFamily: "caveat_semi",
        fontSize: 22
    },
    accent: {
        fontSize: 26,
        color: colors.darkPrimary
    }
})