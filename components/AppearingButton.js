import { CustomButton } from "./CustomButton";

export function AppearingButton({guess, onPress, positioned}) {
    let btn = guess.map((item, i) => {
        if (item.res.includes("4 бика")) {
            return <CustomButton key={i} onPress={onPress} positioned={positioned}>Рестарт</CustomButton>
        }
    });
    return btn;
}
