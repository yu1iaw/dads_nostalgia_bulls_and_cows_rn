import { useState, useEffect } from "react";
import { View, TextInput, StyleSheet, Dimensions } from "react-native";
import { CustomButton } from "./CustomButton";
import colors from "../config/colors";

export function Input({onChangeHandler, disabled, onPress, engLang}) {
    const [value, setValue] = useState('');

    useEffect(() => {
        onChangeHandler(value);
    }, [value])

    const updateValue = () => {
        onPress();
        setValue('');
    }

    return (
        <View style={styles.container}>
            <TextInput 
                inputMode="numeric"
                maxLength={4}
                placeholder="1234"
                disableFullscreenUI={true}
                style={[styles.input, disabled && styles.disabled]} 
                value={value} 
                onChangeText={(text) => setValue(text)} 
            />
            <CustomButton disabled={disabled} onPress={updateValue}>{engLang ? "Check Out" : "Перевірити"}</CustomButton>
		</View>
    )
}

const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: deviceHeight > 915 ? 30 : 15
    },
    input: {
        width: deviceHeight > 915 ? 300 : 150,
        height: deviceHeight > 915 ? 80 : 50,
        marginRight: 20,
        borderColor: colors.lightSecondary,
        borderWidth: 3,
        backgroundColor: colors.darkPrimary,
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: deviceHeight > 915 ? 28 : 20,
        fontFamily: "IBM",
        color: colors.lightSecondary
    },
    disabled: {
        backgroundColor: colors.gray100
    }
})