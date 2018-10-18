function chessboard(symbol1, symbol2, row, col) {
    let result = "\n";
    for (let i = 1; i <= row; i++) {
        for (let j = 1; j <= col; j++) {
            result += (i % 2 === j % 2) ? symbol1 : symbol2;
        }
        result += "\n";
    }
    console.log(result);
}
chessboard('*', ' ', 8, 8);