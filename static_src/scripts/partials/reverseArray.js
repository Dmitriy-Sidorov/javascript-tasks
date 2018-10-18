console.log('--------------------');

function reverseArray(arr) {
    let array = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        array.push(arr[i]);
    }
    return array;
}

function reverseArrayInPlace(array) {
    console.log(Math.floor(array.length / 2));
    for (let i = 0; i < Math.floor(array.length / 2); i++) {
        let old = array[i];
        array[i] = array[array.length - 1 - i];
        array[array.length - 1 - i] = old;
    }
    return array;
}


console.log(reverseArray(['A', 'B', 'C']));
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]

console.log('--------------------');