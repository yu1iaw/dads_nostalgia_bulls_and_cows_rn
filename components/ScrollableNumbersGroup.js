import { StyleSheet, View } from "react-native";
import { ScrollableNumbers } from "./ScrollableNumbers";
import colors from "../config/colors";

export function ScrollableNumbersGroup({opacity}) {
    const style = [styles.container];
    opacity && style.push(styles.opacity);

	return (
		<View style={style}>
			<ScrollableNumbers />
			<ScrollableNumbers />
			<ScrollableNumbers />
			<ScrollableNumbers />
		</View>
	);
}

const styles = StyleSheet.create({
    container: {
        height: 77, 
        flexDirection: "row", 
        backgroundColor: colors.darkPrimary,
        overflow: "hidden"
    },
    opacity: {
        opacity: 0
    }
})