import { useState, useEffect } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { CustomButton } from "./CustomButton";
import colors from "../config/colors";

export function Input({onChangeHandler, disabled, onPress}) {
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
            <CustomButton disabled={disabled} onPress={updateValue}>Перевірити</CustomButton>
		</View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 15
    },
    input: {
        width: 150,
        height: 50,
        marginRight: 20,
        borderColor: colors.lightSecondary,
        borderWidth: 3,
        backgroundColor: colors.darkPrimary,
        borderRadius: 5,
        paddingHorizontal: 10,
        fontSize: 20,
        fontFamily: "IBM",
        color: colors.lightSecondary
    },
    disabled: {
        backgroundColor: colors.gray100
    }
})