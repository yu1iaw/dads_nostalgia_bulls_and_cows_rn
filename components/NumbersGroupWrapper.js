import { Dimensions, StyleSheet, Text } from "react-native";
import { NumbersGroup } from "./NumbersGroup";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import colors from "../config/colors";

export function NumbersGroupWrapper({opacity}) {
    const style = [styles.container];
    opacity && style.push(styles.opacity);

	return (
		<KeyboardAwareScrollView style={style}>
			<Text style={styles.title}>ЗАПИСНИК</Text>
			<NumbersGroup />
            <Text style={styles.span}>*тап - викреслити цифру</Text>
            <Text style={styles.span}>*довгий тап - обрати цифру</Text>
            <Text style={styles.span}>*кодовий замок для злому числа &#8595;</Text>
		</KeyboardAwareScrollView>
	);
}

const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        paddingTop: 8
    },
    title: {
        textAlign: "center", 
        fontFamily: "playfair", 
        fontSize: deviceHeight > 915 ? 29 : 21,
        color: colors.gray500
    },
    span: {
        fontSize: deviceHeight > 915 ? 13 : 11,
        color: colors.gray500,
        marginLeft: 3
    },
    opacity: {
        opacity: 0
    }
})
