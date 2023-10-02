import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Switch } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { setEngLang, setNilOnFront } from "../store/switchesSlice";
import colors from "../config/colors";



export const SettingsSwitch = ({label, initialState, disabled}) => {
	const [checked, setChecked] = useState(initialState);
	const dispatch = useDispatch();
	

	useEffect(() => {
		const onCheckedChange = async () => {
			if (label === "0123") {
				dispatch(setNilOnFront(checked));
				await AsyncStorage.setItem("nilOnFront", JSON.stringify(checked));
			} else {
				dispatch(setEngLang(checked));
				await AsyncStorage.setItem("engLeng", JSON.stringify(checked));
			}
		};

		onCheckedChange();
	}, [checked, label])


	return (
		<View style={styles.container}>
			<Switch value={checked} onValueChange={() => setChecked(!checked)} disabled={disabled} color={colors.darkPrimary} />
			<Text style={{...styles.text, paddingRight: label === "ENG" ? 9.5 : 0, color: checked ? colors.darkPrimary : '#778899'}}>{label}</Text>
		</View>
	);
};


const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		columnGap: 10
	},
	text: {
		fontFamily: "IBM_bold",
		fontSize: 16
	}
})
