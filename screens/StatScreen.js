import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet, Alert, Dimensions } from "react-native";
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Stat } from "../components/Stat";
import { saveMemo } from "../store/historySlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { CustomButton } from "../components/CustomButton";



export function StatScreen({ navigation }) {
	const dispatch = useDispatch();
	const saved = useSelector(state => state.memorise.items);
	const savedArr = [];
	for (const [key, value] of Object.entries(saved)) {
        savedArr.push({['quality']: key, ['quantity']: value})
    }
	const amount = savedArr.reduce((acc, curr) => acc + curr.quantity, 0);


	useEffect(() => {
        navigation.setOptions({
            title: 'Статистика',
            headerLeft: ({tintColor}) => 
                <FontAwesome
                    name="fort-awesome" 
                    size={28} 
                    color={tintColor} 
                    onPress={() => navigation.goBack()}
                />,
			headerRight: ({tintColor}) => 
				<MaterialIcons
					name="cleaning-services" 
					size={31} 
					color={tintColor} 
					onPress={deleteHistory}
				/>,
        })
	}, []);

	const deleteHistory = useCallback(() => {
		Alert.alert('Видалити статистику?', '', [
			{ text: "Скасувати", style: "cancel"},
			{ text: "Видалити", style: "default", onPress: async () => {
				try {
					await AsyncStorage.removeItem('history');
					dispatch(saveMemo({items: {}}));
					navigation.goBack();
				} catch(e) {
					console.log(e);
				}
			}},
			
		])
	}, [dispatch])

	return (
		<View style={styles.container}>
			<View style={styles.barContainer}>
				{savedArr.map((item, i) => <Stat key={i} item={item} amount={amount} /> )}
			</View>
			{/* <CustomButton onPress={deleteHistory}>Очистити</CustomButton> */}
		</View>
	);
}

const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
	container: {
		alignItems: deviceHeight > 915 ? "flex-start" : "center"
	},
	barContainer: {
		padding: deviceHeight > 915 ? 40 : 20
	}
})
