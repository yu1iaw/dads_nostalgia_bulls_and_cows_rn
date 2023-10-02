import { Dimensions, StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";

export function ScrollableResults({attempt, number, hints, engLang}) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{engLang ? "Attempt" : "Спроба"} {attempt} &#9658; <Text style={styles.innerText}>{number}</Text> &#9658;<Text> {hints}</Text></Text>
        </View>
    )
}

const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderRadius: 5,
        marginBottom: 5,
        alignItems: "center"
    },
    text: {
        width: "100%",
        // fontFamily: "playfair",
        fontSize: deviceHeight > 915 ? 21 : 16,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    innerText: {
        color: colors.lightPrimary,
        fontFamily: "IBM",
        fontSize: deviceHeight > 915 ? 23 : 19
    }
})