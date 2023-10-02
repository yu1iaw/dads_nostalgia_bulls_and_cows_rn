import { useState, useEffect } from "react";
import { Dimensions, Pressable, StyleSheet, Text } from "react-native";
import { useRoute } from '@react-navigation/native';
import colors from "../config/colors";

export function Number({text}) {
    const [isTapped, setIsTapped] = useState(false);
    const [isLongTapped, setIsLongTapped] = useState(false);
    const route = useRoute();

    useEffect(() => {
        if (route.params && !route.params.nav) {
            setIsTapped(false);
            setIsLongTapped(false);
        }
    }, [route.params])

    const toggleTap = () => {
        setIsLongTapped(false);
        setIsTapped(state => !state);
    }
    const toggleLongTap = () => {
        setIsTapped(false);
        setIsLongTapped(state => !state);
    }

    return (
        <Pressable 
            disabled={route.params?.nav}
            style={styles.container} 
            onPress={toggleTap} 
            onLongPress={toggleLongTap} 
            delayLongPress={300} 
        >
            <Text style={styles.text}>{text}</Text>
            <Text style={isTapped ? styles.visibleCross : styles.hiddenText}>X</Text>
            <Text style={isLongTapped ? styles.visibleNull : styles.hiddenText}>O</Text>
        </Pressable>
    )
}

const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        position: "relative",
        width: deviceHeight > 915 ? 50 : 36,
        height: 50,
        alignItems: "center"
    },
    text: {
        fontSize: deviceHeight > 915 ? 45 : 32,
        color: colors.gray500
    },
    hiddenText: {
        display: "none"
    },
    visibleCross: {
        position: "absolute",
        right: deviceHeight > 915 ? "17%" : "11%",
        top: deviceHeight > 915 ? "-8%" : "-15%",
        fontSize: deviceHeight > 915 ? 50 : 42,
    },
    visibleNull: {
        position: "absolute",
        top: deviceHeight > 915 ? "-34%" : "-28%",
        right: deviceHeight > 915 ? "1%" : "5%",
        fontSize: deviceHeight > 915 ? 70 : 51,
    }
})