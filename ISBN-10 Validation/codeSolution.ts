export function validISBN10(isbn: string): boolean {
    if (isbn.length !== 10) return false

    const stringArr = isbn.split('')

    const isLastElementX = stringArr[9].toLowerCase() === 'x'

    if (isLastElementX) {
        stringArr[9] = '10'
    }

    const numberArray = stringArr.map((element) => Number.parseInt(element)
    ).filter((number) => !isNaN(number) && number !== undefined && number !== null)

    if (numberArray.length !== 10) return false

    const isbnAcc = numberArray.reduce((acc, curr, index) => {
        acc += curr * (index + 1)
        return acc
    }, 0)

    if (isbnAcc % 11 === 0) return true

    return false
}

console.log(validISBN10('1112223339')) // true
console.log(validISBN10('111222333')) // false
console.log(validISBN10('1112223339X')) // false
console.log(validISBN10('1234554321')) // true
console.log(validISBN10('1234512345')) // false
console.log(validISBN10('048665088X')) // true
console.log(validISBN10('X123456788')) // false
