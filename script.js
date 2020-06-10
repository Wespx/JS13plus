'use strict';

let money = +prompt('Ваш месячный доход?', '');
let income = 'купоны по облигациям';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', '');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 5000000;
let period = 12;
let expenses1 = prompt('Введите обязательную статью расходов?', '');
let amount1 = +prompt('Во сколько это обойдется?', '');
let expenses2 = prompt('Введите обязательную статью расходов?', '');
let amount2 = +prompt('Во сколько это обойдется?', '');

let getExpensesMonth = function() {
    return amount1 + amount2;
};

let getAccumulatedMonth = function() {
    if (isNaN(money) || money < 0) {
        return 'Что-то пошло не так';
    } else {
        return money - getExpensesMonth();
    }
};

let accumulatedMonth = getAccumulatedMonth();
let budgetDay = accumulatedMonth / 30;

let getTargetMonth = function() {
    if (isNaN(accumulatedMonth) || accumulatedMonth < 0) {
        return 'Что-то пошло не так';
    } else {
        return 'Цель будет достингута за ' + Math.ceil(mission / accumulatedMonth) + ' месяцев';
    }
};

let getStatusIncome = function(budget) {
    if (budget >= 1200) {
        return ('У вас высокий уровень дохода');
    } else if (budget >= 600 && budget < 1200) {
        return ('У вас средний уровень дохода');
    } else if (budget > 0 && budget < 600) {
        return ('У вас уровень дохода ниже среднего');
    } else if (budget === 0) {
        return ('У вас нет дохода');
    } else {
        return ('Что-то пошло не так');
    }
};

let showTypeOf = function(data) {
    console.log(data, typeof(data));
};


showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(getExpensesMonth());
console.log(addExpenses.toLowerCase().split(', '));
console.log(getTargetMonth());

console.log('Бюджет на день: ' + budgetDay);
console.log(getStatusIncome(budgetDay));



