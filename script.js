'use strict';

const color = document.querySelector('.color');
const changeColorBtn = document.querySelector('.change-color-btn');

const getRandom16Number = function() {
    return Math.floor(Math.random() * 256).toString(16);
};

const changeColor = function() {
    let newColorNum;
    
    do {
        newColorNum = getRandom16Number() + getRandom16Number() + getRandom16Number();
    } while (newColorNum.length !== 6);

    document.body.style.backgroundColor = '#' + newColorNum;
    color.textContent = '#' + newColorNum;
};


changeColorBtn.addEventListener('click', changeColor);

changeColor();