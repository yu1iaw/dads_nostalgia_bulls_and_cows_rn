import { Image, View } from "react-native";

export function Loading() {
    return (
        <View style={{alignItems: "center", marginTop: 100}}>
            <Image source={require('../assets/splash_screen.gif')} style={{width: 80, height: 80}}/>
        </View>
    )
}