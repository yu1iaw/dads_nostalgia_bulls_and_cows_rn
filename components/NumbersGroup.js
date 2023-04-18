import { StyleSheet, View } from "react-native";
import { Number } from "./Number";

export function NumbersGroup() {
   
    return (
        <View style={styles.container}>
            { [0,1,2,3,4,5,6,7,8,9].map(num => <Number text={num} key={num}/>) }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        flexDirection: "row",
        justifyContent: "space-between",
    }
})