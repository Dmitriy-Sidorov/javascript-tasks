console.log('--------------------');

function triangle(symbol, row) {
    let item = '';
    for (let i = 0; i < row; i++) {
        item = item +''+ symbol;
        console.log(item);
    }
}
triangle('#', 7);

console.log('--------------------');
