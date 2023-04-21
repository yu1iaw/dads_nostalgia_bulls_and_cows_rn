import { Pressable, StyleSheet, Text, Dimensions } from "react-native";
import colors from "../config/colors";

export function CustomButton({disabled, onPress, children, positioned, barrier}) {
    return (
        <Pressable 
            style={({pressed}) => [styles.container, pressed && styles.pressed, disabled && styles.disabled, positioned && styles.positioned, barrier && styles.alt_positioned]} 
            disabled={disabled} 
            onPress={onPress}
        >
            <Text style={[styles.text, positioned && {color: colors.lightSecondary, fontSize: 17}]}>{children}</Text>
        </Pressable>
    )
}

const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        width: 110,
        height: 50,
        backgroundColor: colors.lightSecondary,
        justifyContent: "center",
        borderColor: colors.darkPrimary,
        borderWidth: 3,
        borderRadius: 5,

    },
    text: {
        textAlign: "center",
        color: colors.darkPrimary,
        fontFamily: "IBM_bold",
        fontSize: 15
    },
    pressed: {
        backgroundColor: colors.gray100
    },
    disabled: {
        backgroundColor: colors.gray100,
        borderColor: colors.lightSecondary
    },
    positioned: {
        width: 120,
        backgroundColor: colors.darkPrimary,
        borderColor: colors.lightSecondary,
        position: "absolute",
        top: deviceHeight > 640 ? deviceHeight / 1.68 : deviceHeight > 592 ? deviceHeight / 1.92 : deviceHeight / 2.1,
        right: Dimensions.get("screen").width / 2 - 60,
        zIndex: 20
    },
    alt_positioned: {
        width: 140,
        top: deviceHeight / 1.7,
        left: Dimensions.get("screen").width / 12
    }
})
