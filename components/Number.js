import { useState, useEffect } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
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

const styles = StyleSheet.create({
    container: {
        position: "relative",
        width: 34,
        height: 50,
        alignItems: "center"
    },
    text: {
        fontSize: 32,
        color: colors.gray500
    },
    hiddenText: {
        display: "none"
    },
    visibleCross: {
        position: "absolute",
        right: "11%",
        top: "-15%",
        fontSize: 42,
    },
    visibleNull: {
        position: "absolute",
        top: "-30%",
        right: "4%",
        fontSize: 54,
    }
})