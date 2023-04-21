import { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { View, StyleSheet } from "react-native";
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

	const deleteHistory = useCallback(async () => {
		try {
			await AsyncStorage.removeItem('history');
			dispatch(saveMemo({items: {}}));
			navigation.goBack();
		} catch(e) {
			console.log(e);
		}
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

const styles = StyleSheet.create({
	container: {
		alignItems: "center"
	},
	barContainer: {
		padding: 20
	}
})
