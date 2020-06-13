'use strict';

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
let start = function() {
    do {
        money = prompt('Ваш месячный доход?', '');
    } while (!isNumber(money));
};

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    mission: 1000000,
    period: 8,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function() {
        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Еда, ');
        appData.addExpenses = addExpenses.toLowerCase().split(', ');
        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++) {
            let key = prompt('Введите обязательную статью расходов?', '');
            let howMuch = prompt('Во сколько это обойдется?', '');
            
            while (!isNumber(howMuch)) {
                howMuch = prompt('Во сколько это обойдется? (Введите число)', '');
            }

            appData.expenses[key] = +howMuch;
        }
    },
    getExpensesMonth: function() {
        for (let expense in appData.expenses) {
           appData.expensesMonth += appData.expenses[expense];
        }
        
        return appData.expensesMonth;
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget - appData.expensesMonth;
        appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
    },
    getTargetMonth: function() {
        if (appData.budgetMonth < 0) {
            return 'Цель не будет достигнута';
        } else {
            return 'Цель будет достингута за ' + Math.ceil(appData.mission / appData.budgetMonth) + ' месяцев';
        }
    },
    getStatusIncome: function() {
        if (appData.budget >= 1200) {
            return ('У вас высокий уровень дохода');
        } else if (appData.budget >= 600 && appData.budget < 1200) {
            return ('У вас средний уровень дохода');
        } else if (appData.budget > 0 && appData.budget < 600) {
            return ('У вас уровень дохода ниже среднего');
        } else if (appData.budget === 0) {
            return ('У вас нет дохода');
        } else {
            return ('Что-то пошло не так');
        }
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

let getData = function() {
    console.log('Расходы за месяц: ' + appData.expensesMonth);
    console.log(appData.getTargetMonth());
    console.log(appData.getStatusIncome());
    
    console.log('Наша программа включает в себя данные:');
    for (let data in appData) {
        if (appData[data] !== Object(appData[data])) {
            console.log(data + ' : ' + appData[data]);
        } else if (typeof appData[data] === 'object') {
            console.log(data + ':');
            console.log(appData[data]);
        }
    }
};

getData();



