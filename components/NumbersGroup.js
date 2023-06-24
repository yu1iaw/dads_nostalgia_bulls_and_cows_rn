import { Dimensions, StyleSheet, View } from "react-native";
import { Number } from "./Number";

export function NumbersGroup() {
   
    return (
        <View style={styles.container}>
            { [0,1,2,3,4,5,6,7,8,9].map(num => <Number text={num} key={num}/>) }
        </View>
    )
}

const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        marginTop: deviceHeight > 915 ? 15 : 5,
        marginBottom: deviceHeight > 915 ? 15 : 0,
        flexDirection: "row",
        justifyContent:  deviceHeight > 915 ? "space-around" : "space-between",
    }
})