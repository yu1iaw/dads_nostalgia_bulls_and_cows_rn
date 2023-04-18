import { ScrollView, StyleSheet, Text } from "react-native";

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

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 4,
        overflow: "hidden"
    },
    text: {
        fontSize: 46,
        fontWeight: "bold",
        color: "floralwhite",
        paddingVertical: 6
    }
})