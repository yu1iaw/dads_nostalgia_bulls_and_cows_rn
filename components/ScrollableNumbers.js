import { Dimensions, ScrollView, StyleSheet, Text } from "react-native";
import colors from "../config/colors";

export function ScrollableNumbers() {
    return (
        <ScrollView 
            contentContainerStyle={styles.container} 
            showsVerticalScrollIndicator={false}
            disableIntervalMomentum={true}>
            { [0,1,2,3,4,5,6,7,8,9].map((num, i) => <Text style={styles.text} key={i}>{num}</Text>) }
        </ScrollView>
    )
}

const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: deviceHeight > 915 ? 6 : 4,
        overflow: "hidden"
    },
    text: {
        fontSize: deviceHeight > 915 ? 69 : 46,
        fontWeight: "bold",
        color: colors.lightPrimary,
        paddingVertical: deviceHeight > 915 ? 30: 3
    }
})