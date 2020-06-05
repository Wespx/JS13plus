let money = 70000;
let income = 'купоны по облигациям';
let addExpenses = 'Связь, Коммуналка, Продукты, Транспорт';
let deposit = true;
let mission = 5000000;
let period = 12;
let budgetDay = money / 30;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log(`Период равен ${period} месяцев`);
console.log(`Цель заработать ${mission} шри-ланкийских рупий`);

console.log(addExpenses.toLowerCase().split(', '));

console.log(budgetDay);