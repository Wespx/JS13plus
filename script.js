'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
let income = 'купоны по облигациям';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Еда, коммуналка');
let deposit = confirm('Есть ли у вас депозит в банке?');
let mission = 5000000;
let period = 12;
let expenses = [];

let start = function() {
    do {
        money = prompt('Ваш месячный доход?', '');
    } while (!isNumber(money));
};

start();

let getExpensesMonth = function() {
    let sum = 0;

    for (let i = 0; i < 2; i++) {
        expenses[i] = prompt('Введите обязательную статью расходов?', '');
        let howMuch = prompt('Во сколько это обойдется?', '');
        
        while (!isNumber(howMuch)) {
            howMuch = prompt('Во сколько это обойдется? (Введите число)', '');
        }

        sum += +howMuch;
    }
    console.log(expenses);
    return sum;
};

let expensesAmount = getExpensesMonth();

let getAccumulatedMonth = function() {
    if (+money < 0) {
        return 'Что-то пошло не так';
    } else {
        return +money - expensesAmount;
    }
};

let accumulatedMonth = getAccumulatedMonth();
let budgetDay = Math.ceil(accumulatedMonth / 30);

let getTargetMonth = function() {
    if (accumulatedMonth < 0) {
        return 'Цель не будет достигнута';
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

console.log('Расходы за месяц: ' + expensesAmount);
console.log(addExpenses.toLowerCase().split(', '));
console.log(getTargetMonth());

console.log('Бюджет на день: ' + budgetDay);
console.log(getStatusIncome(budgetDay));



