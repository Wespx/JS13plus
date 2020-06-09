'use strict';

const weekDaysRu = ['Понедельник', 'Вторник', 'Среда',
                    'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
const weekDaysEn = ['Monday', 'Tuesday', 'Wednesday',
'Thursday', 'Friday', 'Saturday', 'Sunday'];

const weekDays = [weekDaysEn, weekDaysRu];

let lang = confirm('Вы понимаете русский язык?');

console.log(weekDays[+lang].join(', ')); //решение без условий через многомерный массив

if (lang) {
    console.log(weekDaysRu.join(', '));
} else {
    console.log(weekDaysEn.join(', '));
}

switch (lang) {
    case true:
        console.log(weekDaysRu.join(', '));
        break;
    default:
        console.log(weekDaysEn.join(', '));
}


let namePerson = prompt('Ваше имя?', 'Андрей');
let personStatus = (namePerson === 'Артем') ? 'директор' :
                   (namePerson === 'Максим') ? 'преподаватель' :
                   'студент';

console.log(personStatus);
