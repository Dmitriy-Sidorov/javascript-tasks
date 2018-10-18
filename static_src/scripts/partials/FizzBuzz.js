console.log('--------------------');


function fizzBuzz(fizz, buzz) {
    let item = '';
    for (let i = 1; i <= 100; i++) {
        if ((i % buzz !== 0) && (i % fizz !== 0)) {
            console.log(i);
        } else {
            if (i % fizz === 0) {
                if (i % buzz === 0) {
                    item = 'FizzBuzz';
                    console.log(item);
                } else {
                    item = 'Fizz';
                    console.log(item);
                }
            }
            if ((i % buzz === 0) && (i % fizz !== 0)) {
                item = 'Buzz';
                console.log(item);
            }
        }
    }
}

fizzBuzz(3, 5);

console.log('--------------------');
