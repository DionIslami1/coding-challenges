const firstSection = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"];
const secondSection = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];
const thirdSection = ["z", "x", "c", "v", "b", "n", "m", ",", "."];

const MAX_KEY_LENGTH = 3;

const keyArray = (key: number): number[] => {
    const keyArray = key.toString().split("").map(Number);

    if (keyArray.length === MAX_KEY_LENGTH) return keyArray;

    const arr = Array.from({ length: MAX_KEY_LENGTH }, () => 0); // [0, 0, 0]

    for (let i = 0; i < MAX_KEY_LENGTH; i++) {
        const checkPosition = arr.length - keyArray.length + i;

        arr[checkPosition] = keyArray[i];

        if (checkPosition + 1 === MAX_KEY_LENGTH) break;
    }

    return arr;
};

function isLowerCase(inputString: string): boolean {
    return inputString === String(inputString).toLowerCase();
}

const specialChar = (char: string): string => {
    if (char === ".") return ">";
    if (char === ",") return "<";

    return char;
};

function encrypt(text: string, key: number): string {
    const keyNumberArray = keyArray(key);
    const textArr = text.split("");
    const allSections = [...firstSection, ...secondSection, ...thirdSection];
    const accumulation: string[] = [];

    for (let i = 0; i < textArr.length; i++) {
        const char = textArr[i];
        // const keyNumber = keyNumberArray[i % MAX_KEY_LENGTH]

        if (!allSections.some((el) => el === char.toLowerCase())) {
            accumulation.push(char);

            continue;
        }

        if (firstSection.some((el) => el === char.toLowerCase())) {
            const isCharLowerCase = isLowerCase(char);
            const findIndex = firstSection.findIndex(
                (el) => el === char.toLowerCase(),
            );

            const encryptChar =
                firstSection[(findIndex + keyNumberArray[0]) % firstSection.length];
            accumulation.push(
                isCharLowerCase ? encryptChar : encryptChar.toUpperCase(),
            );

            continue;
        }

        if (secondSection.some((el) => el === char.toLowerCase())) {
            const isCharLowerCase = isLowerCase(char);
            const findIndex = secondSection.findIndex(
                (el) => el === char.toLowerCase(),
            );

            const encryptChar =
                secondSection[(findIndex + keyNumberArray[1]) % secondSection.length];

            accumulation.push(
                isCharLowerCase ? encryptChar : encryptChar.toUpperCase(),
            );

            continue;
        }

        if (thirdSection.some((el) => el === char.toLowerCase())) {
            const isCharLowerCase = isLowerCase(char);
            const findIndex = thirdSection.findIndex(
                (el) => el === char.toLowerCase(),
            );

            const encryptChar =
                thirdSection[(findIndex + keyNumberArray[2]) % thirdSection.length];

            accumulation.push(
                isCharLowerCase ? encryptChar : specialChar(encryptChar.toUpperCase()),
            );

            continue;
        }
    }

    return accumulation.join("");
}

export function decrypt(text: string, key: number): string {
    return ''
}

console.log(encrypt("Abc", 212)) //   >fdd

// TODO: decrypt in progress, and refactoring the code