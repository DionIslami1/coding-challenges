const MAX_KEY_LENGTH = 3
const sections = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm,.']

const keyDigits = (key: number): number[] => key.toString().padStart(MAX_KEY_LENGTH, "0").split('').map(Number)
const isLowerCase = (inputString: string): boolean => inputString === String(inputString).toLowerCase()

const specialChar = (char: string): string => {
    if (char === '.') return '>'
    if (char === ',') return '<'

    return char
}

const checkSections = (section: string[], char: string, keyPosition: number): string | undefined => {
    if (section.some(el => el === char.toLowerCase())) {
        const isCharLowerCase = isLowerCase(char)
        const findIndex = section.findIndex(el => el === char.toLowerCase())
        const encryptChar = section[(findIndex + keyPosition) % section.length]

        return isCharLowerCase ? encryptChar : specialChar(encryptChar.toUpperCase())
    }
}

export const encrypt = (text: string, key: number): string => {
    const allSectionLetters: string[] = []
    const accumulation: string[] = []
    const keyNumberArray = keyDigits(key)
    const textArr = text.split('')

    for (const row of sections) {
        for (const ch of row) {
            allSectionLetters.push(ch)
        }
    }

    outer: for (let i = 0; i < textArr.length; i++) {
        const char = textArr[i]

        if (!allSectionLetters.some(el => el === char.toLowerCase())) {

            accumulation.push(char)
            continue
        }

        for (let j = 0; j < sections.length; j++) {
            const section = sections[j].split("")
            const element = checkSections(section, char, keyNumberArray[j])

            if (element) {
                accumulation.push(element)
                continue outer
            }
        }
    }

    return accumulation.join('')
}

export function decrypt(text: string, key: number): string {
    return ''
}

console.log(encrypt("Abc", 212)) //   >fdd

// TODO: decrypt in progress, and refactoring the code