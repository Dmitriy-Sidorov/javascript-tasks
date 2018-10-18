console.log('9 --------------------');

let list = {
    value: 1,
    rest: {
        value: 2,
        rest: {
            value: 3,
            rest: null
        }
    }
};

let arrayToList = (arr) => {
    if (arr.length) {
        return {value: arr.shift(), rest: arrayToList(arr)};
    } else {
        return null;
    }
};

let listToArray = (arr) => {
    let array = [];
    do {
        array.push(arr.value);
        arr = arr.rest;
    } while (arr !== null)
    {
        return array;
    }
};

let prepend = (element, list) => {
    return {
        value: element,
        rest: list
    }
};

let nth = (list, index) => {
    if (!list) {
        return undefined;
    } else if (index === 0) {
        return list.value
    } else {
        return nth(list.rest, index - 1)
    }
};

console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(30, prepend(40, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30, 40]), 3));
// → 20

console.log('9 --------------------');
