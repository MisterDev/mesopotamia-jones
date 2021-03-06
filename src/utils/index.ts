export type Maybe<T> = T | null

/**
 * Modulo operation which works on negative numbers too
 * @param n The number to be modulated
 * @param modulo The modulo
 */
export function mod(n: number, modulo: number) {
    return (n % modulo + modulo) % modulo
}

export function next<T>(list: T[], index: number) {
    return mod(index + 1, list.length)
}

export function prev<T>(list: T[], index: number) {
    return mod(index - 1, list.length)
}

export function initList(length: number) {
    const list = new Array(length)
    for (let i = 0; i < list.length; i++) {
        list[i] = 0
    }
    return list
}

export function onlyIf<T>(condition: boolean, component: T): Maybe<T> {
    return condition ? component : null
}

function isDefined<T>(x: Maybe<T>): x is T {
    return x !== null
}

function isUndefined<T>(x: Maybe<T>): x is null {
    return x === null
}

export function getOrElse<T>(x: Maybe<T>, defaultValue: T): T {
    return isDefined(x) ? x : defaultValue
}

export function linearMap(
    fromMin: number,
    fromMax: number,
    toMin: number,
    toMax: number,
    val: number
) {
    return (val - fromMin) * (toMax - toMin) / (fromMax - fromMin) + toMin
}

export function isMobile(): boolean {
    return 'ontouchstart' in window || navigator.msMaxTouchPoints > 0
}
