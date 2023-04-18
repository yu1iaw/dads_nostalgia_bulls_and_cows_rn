import { useState, useEffect, useCallback } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GameScreen } from "./screens/GameScreen";
import { ResultScreen } from "./screens/ResultScreen";

import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import colors from './config/colors';


SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function App() {
	const [AppIsLoaded, setAppIsLoaded] = useState(false);

	useEffect(() => {
		const prepare = async () => {
			try {
				await Font.loadAsync({
					IBM: require("./assets/fonts/IBMPlexMono-Regular.ttf"),
					IBM_bold: require("./assets/fonts/IBMPlexMono-Bold.ttf"),
					playfair: require("./assets/fonts/PlayfairDisplay-Medium.ttf"),
					caveat_semi: require("./assets/fonts/Caveat-SemiBold.ttf")
				});
			} catch (e) {
				console.log(e.message);
			} finally {
				setAppIsLoaded(true);
			}
		};
		prepare();
	}, []);

	const onLayout = useCallback(async() => {
		if (AppIsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [AppIsLoaded]);

	if (!AppIsLoaded) return null;


	return (
		<>
			<StatusBar style="dark" />
			<NavigationContainer>
				<View onLayout={onLayout} style={{flex: 1}}>
					<Stack.Navigator 
						screenOptions={{
							headerTitleAlign: "center",  
							headerTintColor: colors.lightPrimary, 
							contentStyle: {backgroundColor: colors.darkSecondary},
							headerStyle: {backgroundColor: colors.darkPrimary}
						}}
					>
						<Stack.Screen 
							name="MainScreen" 
							component={GameScreen}
							options={{
								title: "Бики і Корови",
								headerTitleStyle: {
									fontFamily: "IBM_bold",
									fontSize: 27,
								}
							}} 
						/>
						<Stack.Screen 
							name="ResultScreen" 
							component={ResultScreen}
							options={{
								headerTitleStyle: {
									fontFamily: "IBM_bold",
									fontSize: 35
								}
							}} 
						/>
					</Stack.Navigator>
				</View>
			</NavigationContainer>
		</>
	);
}

