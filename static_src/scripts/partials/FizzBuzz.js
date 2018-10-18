function fizzBuzz(fizz, buzz) {
    for (let i = 1; i <= 100; i++) {
        if ((i % buzz !== 0) && (i % fizz !== 0)) {
            console.log(i);
        } else {
            if (i % fizz === 0) {
                if (i % buzz === 0) {
                    let item = 'FizzBuzz';
                    console.log(item);
                } else {
                    let item = 'Fizz';
                    console.log(item);
                }
            }
            if ((i % buzz === 0) && (i % fizz !== 0)) {
                let item = 'Buzz';
                console.log(item);
            }
        }
    }
}

fizzBuzz(3, 5);