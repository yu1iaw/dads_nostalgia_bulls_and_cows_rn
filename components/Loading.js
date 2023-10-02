import { useEffect, useRef } from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

export function Loading() {
    const animationRef = useRef(null);

    setTimeout(() => {
        animationRef.current?.play();
    }, 100);


    return (
        <View style={{alignItems: "center", marginTop: 100}}>
            <LottieView ref={animationRef} source={require('../assets/rubik.json')} style={{width: 150, height: 150}}/>
        </View>
    )
}