'use strict';

const getDateTimeFormat1 = function() {
    const dateTimeFormat1Element = document.querySelector('.date-time-format1');
    const options = {month:'long', day:'numeric', weekday: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
    const todayDateArr = new Date().toLocaleString('ru', options).split(', ');
    const weekday = todayDateArr[0].charAt(0).toUpperCase() + todayDateArr[0].slice(1);
    const day =  todayDateArr[1].replace('г.', 'года');
    const timeArr = todayDateArr[2].split(':');

    const decOfNum = function (number, titles) {
        const decCache = [];
        const decCases = [2, 0, 1, 1, 1, 2];
        
        if(!decCache[number]) {
            decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)];
            return titles[decCache[number]];
        }
    };

    timeArr[0] += decOfNum(+timeArr[0], [' час', ' часа', ' часов']);
    timeArr[1] += decOfNum(+timeArr[1], [' минута', ' минуты', ' минут']);
    timeArr[2] += decOfNum(+timeArr[2], [' секунда', ' секунды', ' секунд']);

    dateTimeFormat1Element.innerHTML = 'Сегодня ' + weekday + ', ' + day + ', ' + timeArr.join(' ');
};

getDateTimeFormat1();
setInterval(getDateTimeFormat1, 1000);

const getDateTimeFormat2 = function () {
    const dateTimeFormat2Element = document.querySelector('.date-time-format2');
    const todayDate = new Date();
    const currentYear = todayDate.getFullYear();
    let currentMonth = todayDate.getMonth() + 1;
    let currentDay = todayDate.getDate();
    let currentHours = todayDate.getHours();
    let currentMinutes = todayDate.getMinutes();
    let currentSeconds = todayDate.getSeconds();

    if (currentDay < 10) {
        currentDay = '0' + currentDay;
    }

    if (currentMonth < 10) {
        currentMonth = '0' + currentMonth;
    }

    if (currentHours < 10) {
        currentHours = '0' + currentHours;
    }

    if (currentMinutes < 10) {
        currentMinutes = '0' + currentMinutes;
    }

    if (currentSeconds < 10) {
        currentSeconds = '0' + currentSeconds;
    }

dateTimeFormat2Element.innerHTML = currentDay + '.' + currentMonth + '.' + currentYear +
                                    ' - ' + currentHours + ':' + currentMinutes + ':' + currentSeconds;
};

getDateTimeFormat2();
setInterval(getDateTimeFormat2, 1000);