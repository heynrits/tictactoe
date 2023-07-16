export function deepClone2DArray(array) {
    return array.map((row) => [...row])
}