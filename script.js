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
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 1000000,
    period: 8,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function() {
        if(confirm('Есть ли у вас дополнительный источник заработка?')) {
            let itemIncome;
            let cashIncome;

            do {
                itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
            } while (!itemIncome.trim() || isNumber(itemIncome));
            
            do {
                cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', '10000');
            } while (!isNumber(cashIncome));

            appData.income[itemIncome] = cashIncome;
        }
        
        let addExpenses;
        
        do {
            addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Еда, вода');
        } while (!addExpenses.trim() || isNumber(addExpenses));

        appData.addExpenses = addExpenses.toLowerCase().split(', ');

        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++) {
            let key;
            let howMuch;
            
            do {
                key = prompt('Введите обязательную статью расходов?', 'Интернет');
            } while (!key.trim() || isNumber(key));
            
            do {
                howMuch = prompt('Во сколько это обойдется?', '1000');
            } while (!isNumber(howMuch));

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
    },
    getInfoDeposit: function() {
        if(appData.deposit) {
            let percent;
            let amount;

            do {
                percent = prompt('Какой годовой процент?', '10');
            } while (!isNumber(percent));
            
            do {
                amount = prompt('Какая сумма вложена?', '10000');
            } while (!isNumber(amount));
            
            appData.percentDeposit = percent;
            appData.moneyDeposit = amount;
        }
    },
    calcSavedMoney: function(){
        return appData.budgetMonth * appData.period;
    }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getInfoDeposit();

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

console.log(
    appData.addExpenses
    .map(expense => expense.charAt(0).toUpperCase() + expense.slice(1))
    .join(', ')
);



