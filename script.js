'use strict';

const num = 266219;

function multiplyDigits(number) {
    const arr = number.toString().split('');
    const reducer = (accumulator, currentValue) => accumulator * currentValue;    
    let result = arr.reduce(reducer);

    console.log(result);
    result = (result ** 3).toString();
    alert('Первые две цифры результата: ' + result[0] + result[1]);
}

multiplyDigits(num);