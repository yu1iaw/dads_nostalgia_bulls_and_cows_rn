import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { SettingsSwitch } from "../components/SettingsSwitch";
import { useSelector } from "react-redux";

export const SettingsScreen = ({navigation, route}) => {
    const { nilOnFront } = useSelector(state => state.switches);
    const { engLang } = useSelector(state => state.switches);
   

    useEffect(() => {
        navigation.setOptions({
            title: engLang ? "Settings" : "Налаштування",
            headerLeft: ({tintColor}) => 
                <FontAwesome 
                    name="mail-reply" 
                    size={24} 
                    color={tintColor} 
                    onPress={() => navigation.goBack()}
                />
        })
    }, [engLang])


    return (
        <View style={styles.switchContainer}>
            <SettingsSwitch disabled={!!route.params?.guess} initialState={nilOnFront} label={"0123"} />
            <SettingsSwitch disabled={!!route.params?.guess} initialState={engLang} label={"ENG"} />
        </View>
    )
}

const styles = StyleSheet.create({
    switchContainer: {
        marginTop: 30,
        marginHorizontal: 25
    }
})