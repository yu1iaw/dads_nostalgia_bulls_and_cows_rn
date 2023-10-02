import { StyleSheet, View, Text, Dimensions } from "react-native";
import { useSelector } from "react-redux";

import colors from "../config/colors";

export function Greeting() {
	const { engLang } = useSelector((state) => state.switches);
	const content = engLang ? (
		<Text style={styles.text}>
			The goal of the game is to guess a four-digit number. All digits must be different. The number of <Text style={styles.accent}>bulls</Text> means
			the number of guessed digits in the correct positions, the number of <Text style={styles.accent}>cows</Text> is the number of guessed digits in
			the wrong positions. Let's play!
		</Text>
	) : (
		<Text style={styles.text}>
			Мета гри - вгадати чотиризначне число. Всі цифри мають бути різними. Кількість <Text style={styles.accent}>биків</Text> означає кількість
			вгаданих цифр на правильних позиціях, кількість <Text style={styles.accent}>корів</Text> - кількість вгаданих цифр не на своїх позиціях. Нумо
			грати!
		</Text>
	);

	return (
		<View style={styles.container}>
			<View style={{ width: "81%" }}>{content}</View>
		</View>
	);
}

const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
	container: {
		paddingVertical: deviceHeight > 915 ? 50 : 16,
		paddingHorizontal: 10,
		alignItems: "center",
	},
	text: {
		fontFamily: "caveat_semi",
		fontSize: deviceHeight > 915 ? 30 : 22,
	},
	accent: {
		fontSize: deviceHeight > 915 ? 36 : 26,
		color: colors.darkPrimary,
	},
});
