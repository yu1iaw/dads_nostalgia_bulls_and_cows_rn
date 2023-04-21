import { useEffect } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, ImageBackground } from "react-native";
import { CustomButton } from "../components/CustomButton";
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';


export function ResultScreen({navigation, route}) {
    const {initial} = route.params;
    const history = useSelector(state => state.memorise.items);


    useEffect(() => {
		const saveHistory = async () => {
			try {
				await AsyncStorage.setItem('history', JSON.stringify(history));
			} catch(e) {
				console.log(e);
			} 
		}
		saveHistory();
	}, [initial])

    useEffect(() => {
        navigation.setOptions({
            title: initial,
            headerLeft: ({tintColor}) => 
                <FontAwesome 
                    name="mail-reply" 
                    size={24} 
                    color={tintColor} 
                    onPress={() => navigation.goBack()}
                />,
            headerRight: ({tintColor}) => 
                <Ionicons 
                    name="stats-chart-sharp" 
                    size={24} 
                    color={tintColor} 
                    onPress={() => navigation.replace("StatScreen")}
                />,
        })
    }, [])

    return (
        <ImageBackground 
            source={require("../assets/rodeo-bull-riding.png")}
            resizeMode="contain"
            style={styles.container}>
            <CustomButton onPress={() => navigation.navigate("MainScreen", {nav : false})} barrier>Грати знову</CustomButton>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})