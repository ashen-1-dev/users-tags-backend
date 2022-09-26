export function countUppercaseLetters(value: string) {
    return value.length - value.replace(/[A-Z]/g, '').length;
}

export function countLowercaseLetters(value: string) {
    return value.length - value.replace(/[a-z]/g, '').length;
}