'use strict';

function handleString(str) {
    if (typeof str !== 'string') {
        alert('В качестве аргумента передана не строка');
    } else if (str.length > 30) {
        return str.trim().slice(0, 30) + '...';
    } else {
        return str.trim();
    }
}

console.log(handleString('123456789012345678901234567890123'));