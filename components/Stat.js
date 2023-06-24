import { Dimensions, StyleSheet, Text, View } from "react-native";
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

const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 5,
    },
    textContainer: {
        width: deviceHeight > 915 ? 120 :  90
    },
    text: {
        fontFamily: "caveat_semi",
        fontSize: deviceHeight > 915 ? 30 : 21
    },
    progressBarContainer: {
        flexDirection: "row",
        alignItems: deviceHeight > 915 ? "stretch" : "flex-end"
    },
    innerBarContainer: {
        width: deviceHeight > 915 ? 500 : 200,
        backgroundColor: colors.lightPrimary
    },
    progressBar: {
        backgroundColor: colors.darkPrimary,
        flex: deviceHeight > 915 ? 1 : 0
    },
    amountContainer: {
        width: deviceHeight > 915 ? 100 : 56,
        alignItems: "center",
        marginLeft: 4
    },
    amount: {
        fontFamily: "IBM",
        fontSize: deviceHeight > 915 ? 20 : 15
    }
})