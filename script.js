'use strict';

const showWeekDays = function() {
    const date = new Date().getDay();
    const weekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

    for (let i = 0; i < weekDays.length; i++) {
        const weekDaysHMTL = `<div id=${i} style="text-align: center; font-size: 24px;">${weekDays[i]}</div>`;   
        document.body.insertAdjacentHTML('beforeend', weekDaysHMTL);

        const weekDaysElem = document.getElementById(i.toString());
        
        switch (i) {
            case date:
                weekDaysElem.style.fontStyle = 'italic';
            case 0:
            case 6:
                weekDaysElem.style.fontWeight = 'bold';
                weekDaysElem.after(document.getElementById(0));
        }
    }
};

showWeekDays();