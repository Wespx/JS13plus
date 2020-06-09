'use strict';

function handleString(str) {
    if (typeof str !== 'string') {
        alert('В качестве аргумента передана не строка');
    } else if (str.length > 30) {
        return str.trim().replace(str.substring(30), '...');
    } else {
        return str.trim();
    }
}