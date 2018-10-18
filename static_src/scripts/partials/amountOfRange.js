console.log('--------------------');

function range(first, last, step = 1) {
    let arr = [];
    if (first < last) {
        for (let i = first; i <= last; i++) {
            arr.push(i);
        }
    } else {
        for (let i = first; i >= last; i--) {
            arr.push(i);
        }
    }
    return arr;
}

function sum(arr) {
    return arr.reduce((sum, current) =>
        sum + current, 0);
}

console.log(range(1, 10));
console.log(range(1, 5, 2));
console.log(range(5, 1, -1));
console.log(sum(range(1, 10)));

console.log('--------------------');