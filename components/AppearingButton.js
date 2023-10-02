import { CustomButton } from "./CustomButton";

export function AppearingButton({guess, onPress, positioned, engLang}) {
    let btn = guess.map((item, i) => {
        if (item.res.includes("4 бика") || item.res.includes("4 bulls")) {
            return <CustomButton key={i} onPress={onPress} positioned={positioned}>{engLang ? 'Restart' : 'Рестарт'}</CustomButton>
        }
    });
    return btn;
}
