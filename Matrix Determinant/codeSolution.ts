const sections = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm,.']
const specialCharacters = ['<', '>']

const MAX_KEY_LENGTH = 3

const keyDigits = (key: number): number[] => key.toString().padStart(MAX_KEY_LENGTH, "0").split('').map(Number)

const isLowerCase = (inputString: string): boolean => inputString === String(inputString).toLowerCase()

const specialChar = (char: string): string => {
    if (char === '.') return '>'
    if (char === ',') return '<'

    return char
}

const decryptSpecialChars = (char: string): string => {
    if (char === '<') return ','
    if (char === '>') return '.'

    return char
}

const checkSections = (section: string[], char: string, keyPosition: number, isDecrypting = false): string | undefined => {
    if (section.some(el => el === decryptSpecialChars(char).toLowerCase())) {
        const isCharLowerCase = isLowerCase(char)

        if (isDecrypting) {
            const findIndex = section.findIndex(el => el === decryptSpecialChars(char).toLowerCase())
            const decryptPosition = findIndex - keyPosition
            const isPositiveNumber = Math.sign(decryptPosition)
            const position = !!(isPositiveNumber === 1 || isPositiveNumber === 0) ? decryptPosition : decryptPosition + section.length
            const decryptChar = section[position]

            return isCharLowerCase && !specialCharacters.includes(char) ? decryptChar : specialChar(decryptChar).toUpperCase()
        }
        const findIndex = section.findIndex(el => el === char.toLowerCase())
        const encryptPosition = findIndex + keyPosition
        const encryptChar = section[encryptPosition % section.length]

        return isCharLowerCase ? encryptChar : specialChar(encryptChar).toUpperCase()
    }
}

const calculate = (text: string, key: number, isDecrypting = false): string => {
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

        if (!allSectionLetters.some(el => el === decryptSpecialChars(char).toLowerCase())) {
            accumulation.push(char)
            continue
        }

        for (let j = 0; j < sections.length; j++) {
            const section = sections[j].split("")
            const element = checkSections(section, char, keyNumberArray[j], isDecrypting)

            if (element) {
                accumulation.push(element)
                continue outer
            }
        }
    }

    return accumulation.join('')
}

export const encrypt = (text: string, key: number): string => calculate(text, key)

export const decrypt = (text: string, key: number): string => calculate(text, key, true)