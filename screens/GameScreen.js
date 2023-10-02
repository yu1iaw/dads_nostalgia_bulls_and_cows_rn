import { StyleSheet, View, ScrollView, Alert, Keyboard, Dimensions } from "react-native";
import { useState, useMemo, useEffect, useLayoutEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
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
import { setEngLang, setNilOnFront } from "../store/switchesSlice";


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

function generator(isNilOnFront) {
	let atAll = "0123456789";
	let num =
		Math.floor(Math.random() * atAll.length).toString() +
		Math.floor(Math.random() * atAll.length) +
		Math.floor(Math.random() * atAll.length) +
		Math.floor(Math.random() * atAll.length);

	if (isNilOnFront) {
		if (num.split("").find((digit) => num.indexOf(digit) !== num.lastIndexOf(digit))) {
			num = generator();
		}
	} else {
		if (num.split("").find((digit) => num.indexOf(digit) !== num.lastIndexOf(digit)) || num[0] == 0) {
			num = generator();
		}
	}
	return num;

}

function guessNumber(num, count, isEng) {
	let bulls = 0,
		cows = 0;
	for (let i = 0; i < num.length; i++) {
		if (count.includes(num[i]) && num[i] === count[i]) {
			bulls++;
		} else if (count.includes(num[i])) {
			cows++;
		}
	}
	if (isEng) {
		return `${bulls} ${bulls !== 1 ? 'bulls' : 'bull'}, ${cows} ${cows !== 1 ? 'cows' : 'cow'}`;
	}

	return `${bulls} ${bulls > 1 ? 'бика' : bulls == 1 ? 'бик' : 'биків'}, ${cows} ${cows > 1 ? 'корови' : cows == 1 ? 'корова' : 'корів'}`;
}


export function GameScreen({ navigation, route }) {
	const { nilOnFront } = useSelector(state => state.switches);
	const { engLang } = useSelector(state => state.switches);
	const [mode, setMode] = useState(true);
	const initial = useMemo(() => generator(nilOnFront), [mode, nilOnFront]);
	const [count, setCount] = useState(initial);
	const [value, setValue] = useState("");
	const [guess, setGuess] = useState([]);
	const [keyBoard, setKeyBoard] = useState(false);
	const [greet, setGreet] = useState(null);
	const guessLength = guess.length;
	const dispatch = useDispatch();

	// AsyncStorage.removeItem("nilOnFront");
	// AsyncStorage.removeItem("engLeng");


	useEffect(() => {
		dispatch(loadData());
		const getStateFromStore = async () => {
			try {
				const nilOnFrontString = await AsyncStorage.getItem('nilOnFront');
				if (nilOnFrontString !== null) {
					const nilOnFront = JSON.parse(nilOnFrontString);
					dispatch(setNilOnFront(nilOnFront));
				}
			} catch(e) {
				console.log(e);
			} 
			try {
				const engLengString = await AsyncStorage.getItem('engLeng');
				if (engLengString !== null) {
					const engLeng = JSON.parse(engLengString);
					dispatch(setEngLang(engLeng));
				}
			} catch (e) {
				console.log(e);
			}
		}
		getStateFromStore();
	}, [dispatch])

	
	const submit = () => {
		if (value.split('').find(dig => value.indexOf(dig) !== value.lastIndexOf(dig)) || !value || value.length < 4 || /\D/g.test(value)) {
			{
				engLang ? (
					Alert.alert('4-digit number is required!', "and all digits must be different", [{text: "Okay!", style: "cancel", onPress: () => setValue("")}])
				) : (
					Alert.alert('Не допускаються однакові цифри', "а також число менше чотиризначного", [{text: "Святий Ґрааль!", style: "cancel", onPress: () => setValue("")}])
				)
			}
			return;
		}
		const newGuess = {
			id: Math.random().toFixed(5),
			value,
			res: guessNumber(value, count, engLang),
		};
		setGuess((curr) => [newGuess, ...curr]);
		setValue("");
		if (newGuess.res.includes("4 бика") || newGuess.res.includes("4 bulls")) {
			dispatch(addMemoItem({item: guessLength + 1}));
			setMode((mode) => !mode);
			navigation.navigate("ResultScreen", { initial: count });
			navigation.setParams({ nav: true });
		}
	};

	const restart = () => {
		setGuess([]);
		setCount(initial);
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
		} else if ((route.params && !route.params.nav) || !route.params) {
			guess.length !== 0 && setGuess([]);
			count !== initial && setCount(initial);
		}
	}, [route.params, initial]);

	useEffect(() => {
		if ((route.params && !route.params.nav) || !route.params) {
			navigation.setOptions({
				headerRight: ({ tintColor }) => (
					<FontAwesome name="gears" size={25} color={tintColor} style={{marginTop: 4, paddingVertical: 4, paddingLeft: 8}} onPress={() => navigation.navigate("SettingsScreen", {guess: guessLength})} />
				)
			});
		}
	}, [guess])

	useLayoutEffect(() => {
		navigation.setOptions({
			title: engLang ? "Bulls-n-Cows" : "Бики і Корови"
		});
	}, [engLang])

	
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
			<Input engLang={engLang} onChangeHandler={onChangeHandler} disabled={route.params?.nav} onPress={submit}/>
			{greet}
			<AppearingButton engLang={engLang} guess={guess} onPress={restart} positioned />
			<View 
				style={{...styles.scrollContainer, height: deviceHeight > 915 ? 630 : deviceHeight > 640 ? 360: deviceHeight > 592 ? 255 : 209}}>
				<ScrollView showsVerticalScrollIndicator={false}>
					{guess.map((item, i) => {
						return (
							<ScrollableResults 
								key={i} 
								attempt={guessLength - i} 
								number={item.value} 
								hints={item.res}
								engLang={engLang} />
						);
					})}
				</ScrollView>
			</View>
			{ guess.length > 0 && <NumbersGroupWrapper engLang={engLang} opacity={keyBoard}/> }
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
