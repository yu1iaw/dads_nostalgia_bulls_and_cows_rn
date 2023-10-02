import { useState, useEffect, useCallback } from "react";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PaperProvider } from 'react-native-paper';
import { GameScreen } from "./screens/GameScreen";
import { ResultScreen } from "./screens/ResultScreen";
import { StatScreen } from "./screens/StatScreen";

import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import colors from "./config/colors";
import { Provider } from "react-redux";
import store from "./store/store";
import { SettingsScreen } from "./screens/SettingsScreen";


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
					caveat_semi: require("./assets/fonts/Caveat-SemiBold.ttf"),
				});
			} catch (e) {
				console.log(e.message);
			} finally {
				setAppIsLoaded(true);
			}
		};
		prepare();
	}, []);

	const onLayout = useCallback(async () => {
		if (AppIsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [AppIsLoaded]);

	if (!AppIsLoaded) return null;

	return (
		<Provider store={store}>
			<StatusBar style="dark" />
			<NavigationContainer>
				<PaperProvider>
					<View onLayout={onLayout} style={{ flex: 1 }}>
						<Stack.Navigator
							screenOptions={{
								headerTitleAlign: "center",
								headerTintColor: colors.lightPrimary,
								contentStyle: { backgroundColor: colors.darkSecondary },
								headerStyle: { backgroundColor: colors.darkPrimary },
							}}>
							<Stack.Screen
								name="MainScreen"
								component={GameScreen}
								options={{
									headerTitleStyle: {
										fontFamily: "IBM_bold",
										fontSize: 27,
									},
								}}
							/>
							<Stack.Screen
								name="ResultScreen"
								component={ResultScreen}
								options={{
									headerTitleStyle: {
										fontFamily: "IBM_bold",
										fontSize: 35,
									},
								}}
							/>
							<Stack.Screen
								name="StatScreen"
								component={StatScreen}
								options={{
									headerTitleStyle: {
										fontFamily: "IBM_bold",
										fontSize: 30,
									},
								}}
							/>
							<Stack.Screen
								name="SettingsScreen"
								component={SettingsScreen}
								options={{
									headerTitleStyle: {
										fontFamily: "IBM_bold",
										fontSize: 27,
									},
								}}
							/>
						</Stack.Navigator>
					</View>
				</PaperProvider>
			</NavigationContainer>
		</Provider>
	);
}
