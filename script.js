'use strict';

let getNumbersStartingAt2Or4 = function() {
    let arr = [];

    let pushRandomNumbers = function() {
        let randomNumber = function() {
        return Math.floor(Math.random() * 10000).toString();
        };
        
        for (let i = 0; i < 5; i++) {
            arr.push(randomNumber());
        }

        arr.push('2' + randomNumber().slice(0, -1));
        arr.push('4' + randomNumber().slice(0, -1));
    };

    let getCertainNumbers = function() {
        arr.forEach(number => {
            if (number[0] === '2' || number[0] === '4') {
                console.log(number);
            }
        });
    };

    pushRandomNumbers();
    getCertainNumbers();
};

let getPrimeNumbers = function() {
    for (let i = 2; i <= 100; i++) {
        let divisorCount = 0;
        
        for (let j = 0; j <= i; j++) {
            if (i % j === 0 || i % j === i) {
                divisorCount++;
            }
        }

        if (divisorCount === 2) {
            console.log(`Число ${i} является простым. Его делители: 1 и ${i}`);
        }
    }
};

getNumbersStartingAt2Or4();
getPrimeNumbers();

