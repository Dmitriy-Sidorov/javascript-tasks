console.log('--------------------');


function min(a, b) {
    if (typeof a === 'number' && typeof b === 'number') {
        if (a < b) {
            console.log(a);
        } else {
            console.log(b);
        }
    } else {
        console.log("не сравнить")
    }
}
min(0, 10);
min(-5, 1);
min('1', 0);

console.log('--------------------');
