import { useEffect } from "react";
import { StyleSheet, ImageBackground } from "react-native";
import { CustomButton } from "../components/CustomButton";
import { FontAwesome } from '@expo/vector-icons';

export function ResultScreen({navigation, route}) {
    const digit = route.params.initial;

    useEffect(() => {
        navigation.setOptions({
            title: digit,
            headerLeft: ({tintColor}) => 
            <FontAwesome 
              name="mail-reply" 
              size={24} 
              color={tintColor} 
              onPress={() => navigation.goBack()}
            />
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
        flex: 1,
    }
})