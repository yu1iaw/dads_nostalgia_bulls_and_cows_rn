import { StyleSheet, View, ScrollView, Alert, Keyboard, Dimensions } from "react-native";
import { useState, useMemo, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { FontAwesome } from "@expo/vector-icons";
import { Input } from "../components/Input";
import { ScrollableResults } from "../components/ScrollableResults";
import { ScrollableNumbersGroup } from "../components/ScrollableNumbersGroup";
import { NumbersGroupWrapper } from "../components/NumbersGroupWrapper";
import { AppearingButton } from "../components/AppearingButton";
import { Greeting } from "../components/Greeting";
import { Loading } from "../components/Loading";
import { addMemoItem, saveMemo } from '../store/historySlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

function loadData() {
	return async dispatch => {
		try {
			const historyString = await AsyncStorage.getItem('history');
			if (historyString !== null) {
				const history = JSON.parse(historyString);
				dispatch(saveMemo({items: history}));
			}
		} catch(e) {
			console.log(e);
		}
	}
}

function generator() {
	let atAll = "0123456789";
	let num =
		Math.floor(Math.random() * atAll.length).toString() +
		Math.floor(Math.random() * atAll.length) +
		Math.floor(Math.random() * atAll.length) +
		Math.floor(Math.random() * atAll.length);

	if (num.split("").find((digit) => num.indexOf(digit) !== num.lastIndexOf(digit)) || num[0] == 0) {
		num = generator();
	}
	return num;
}

function guessNumber(num, count) {
	let bulls = 0,
		cows = 0;
	for (let i = 0; i < num.length; i++) {
		if (count.includes(num[i]) && num[i] === count[i]) {
			bulls++;
		} else if (count.includes(num[i])) {
			cows++;
		}
	}
	return `${bulls} ${bulls > 1 ? 'бика' : bulls == 1 ? 'бик' : 'биків'}, ${cows} ${cows > 1 ? 'корови' : cows == 1 ? 'корова' : 'корів'}`;
}


export function GameScreen({ navigation, route }) {
	const [mode, setMode] = useState(true);
	const initial = useMemo(() => generator(), [mode]);
	const [count, setCount] = useState(initial);
	const [value, setValue] = useState("");
	const [guess, setGuess] = useState([]);
	const [keyBoard, setKeyBoard] = useState(false);
	const [greet, setGreet] = useState(null);
	const guessLength = guess.length;
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadData());
	}, [dispatch])

	
	const submit = () => {
		if (value.split('').find(dig => value.indexOf(dig) !== value.lastIndexOf(dig)) || !value) {
			Alert.alert('Не допускаються однакові цифри', "...або намагаєшся ввести порожнє значення!", [{text: "Святий Ґрааль!", style: "cancel", onPress: () => setValue("")}]);
			return;
		}
		const newGuess = {
			id: Math.random().toFixed(5),
			value,
			res: guessNumber(value, count),
		};
		setGuess((curr) => [newGuess, ...curr]);
		setValue("");
		if (newGuess.res.includes("4 бика")) {
			dispatch(addMemoItem({item: guessLength + 1}));
			setMode((mode) => !mode);
			navigation.navigate("ResultScreen", { initial: count });
			navigation.setParams({ nav: true });
		}
	};

	const restart = () => {
		setGuess([]);
		setCount(initial);
		navigation.setOptions({
			headerRight: null,
		});
		navigation.setParams({ nav: false });
	};

	const onChangeHandler = (value) => {
		setValue(value);
	}

	useEffect(() => {
		if (route.params?.nav) {
			navigation.setOptions({
				headerRight: ({ tintColor }) => (
					<FontAwesome name="mail-forward" size={24} color={tintColor} onPress={() => navigation.navigate("ResultScreen", { initial: count })} />
				),
			});
		} else if (route.params && !route.params.nav) {
			navigation.setOptions({
				headerRight: null,
			});
			setGuess([]);
			setCount(initial);
		}
	}, [route.params]);

	
	useEffect(() => {
		const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
		  setKeyBoard(true);
		});
		const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
		  setKeyBoard(false);
		});
	
		return () => {
		  showSubscription.remove();
		  hideSubscription.remove();
		};
	}, []);


	useEffect(() => {
		if (guessLength == 0 && !route.params) {
			setGreet(<Greeting />);
		} else if (guessLength == 0) {
			setGreet(<Loading />)
		} else {
			setGreet(null);
		}
	}, [guessLength, route.params]);



	return (
		<View style={styles.container}>
			<Input onChangeHandler={onChangeHandler} disabled={route.params?.nav} onPress={submit}/>
			{greet}
			<AppearingButton guess={guess} onPress={restart} positioned />
			<View 
				style={{...styles.scrollContainer, height: deviceHeight > 915 ? 630 : deviceHeight > 640 ? 360: deviceHeight > 592 ? 255 : 209}}>
				<ScrollView showsVerticalScrollIndicator={false}>
					{guess.map((item, i) => {
						return (
							<ScrollableResults 
								key={i} attempt={guessLength - i} 
								number={item.value} 
								hints={item.res} />
						);
					})}
				</ScrollView>
			</View>
			{ guess.length > 0 && <NumbersGroupWrapper opacity={keyBoard}/> }
			{ guess.length > 0 && <ScrollableNumbersGroup opacity={keyBoard}/> }	
		</View>
	);
}

const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 5
	},
	scrollContainer: {
		alignItems: "center",
		marginHorizontal: 5
	}
});
