import { StyleSheet, Text, View } from "react-native";
import colors from "../config/colors";

export function Stat({item, amount}) {
    const width = Math.round(item.quantity * 100 / amount) + '%';

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{item.quality  == 'moreThan10' ? '10+' : item.quality} {item.quality.length > 2 ? '' : item.quality == 1 ? 'спроба' : item.quality > 1 && item.quality < 5 ? 'спроби' : 'спроб'}</Text>
            </View>
            <View style={styles.progressBarContainer}>
                <View style={styles.innerBarContainer}>
                    <View style={{...styles.progressBar, width}}>
                        <Text></Text>
                    </View>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{item.quantity}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 5,
    },
    textContainer: {
        width: 90
    },
    text: {
        fontFamily: "caveat_semi",
        fontSize: 21
    },
    progressBarContainer: {
        flexDirection: "row",
        alignItems: "flex-end"
    },
    innerBarContainer: {
        width: 200,
        backgroundColor: colors.lightPrimary
    },
    progressBar: {
        backgroundColor: colors.darkPrimary
    },
    amountContainer: {
        width: 56,
        alignItems: "center",
        marginLeft: 4
    },
    amount: {
        fontFamily: "IBM",
        fontSize: 15
    }
})