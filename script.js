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
let budgetMonth = money - (amount1 + amount2);
let budgetDay = budgetMonth / 30;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);
console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} шри-ланкийских рупий`);
console.log(addExpenses.toLowerCase().split(', '));

console.log('Цель будет достингута за ' + Math.ceil(mission / budgetMonth) + ' месяцев');

if (isNaN(money) || money < 0) {
    console.log('Что-то пошло не так');
} else {
    console.log('Бюджет на месяц: ' + budgetMonth);
}

if (isNaN(period) || period < 0) {
    console.log('Что-то пошло не так');
} else {
    console.log('Бюджет на день: ' + Math.floor(budgetDay));
}

if (budgetDay >= 1200) {
    console.log('У вас высокий уровень дохода');
} else if (budgetDay >= 600 && budgetDay < 1200) {
    console.log('У вас средний уровень дохода');
} else if (budgetDay > 0 && budgetDay < 600) {
    console.log('У вас уровень дохода ниже среднего');
} else if (budgetDay === 0) {
    console.log('У вас нет дохода');
} else {
    console.log('Что-то пошло не так');
}