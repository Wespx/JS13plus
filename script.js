'use strict';

const num = 266219;

function multiplyDigits(number) {
    const arr = number.toString().split('');
    let result = arr[0];
    
    for (let i = 1; i < arr.length; i++) {
        result *= arr[i];
    }
    
    console.log(result);
    result = (result ** 3).toString();
    alert('Первые две цифры результата: ' + result[0] + result[1]);
}

multiplyDigits(num);