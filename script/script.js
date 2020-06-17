'use strict';

const startButton = document.getElementById('start');
const addIncomeButton = document.getElementsByTagName('button')[0];
const addExpenseButton = document.getElementsByTagName('button')[1];
const depositCheckbox = document.querySelector('#deposit-check');
const addIncomeInputs = document.querySelectorAll('additional_income-item');
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const addIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const addExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const periodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const salaryInput = document.querySelector('.salary-amount');
const incomeTitleInput = document.querySelector('.income-title');
const incomeAmountInput = document.querySelector('.income-amount');
const addIncomeItem1 = document.querySelectorAll('.additional_income-item')[0];
const addIncomeItem2 = document.querySelectorAll('.additional_income-item')[1];
const expensesTitleInput = document.querySelector('.expenses-title');
const expensesAmountInput = document.querySelector('.expenses-amount');
const addExpensesInput = document.querySelector('.additional_expenses-item');
const targetAmountInput = document.querySelector('.target-amount');
const periodSelectInput = document.querySelector('.period-select');


let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let valid = function(str) {
	const nameReg = /^[,а-яА-ЯёЁ\s]+$/;
	return nameReg.test(str);
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
            } while (!valid(itemIncome.trim()));
            
            do {
                cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', '10000');
            } while (!isNumber(cashIncome));

            appData.income[itemIncome] = cashIncome;
        }
        
        let addExpenses;
        
        do {
            addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'Еда, вода');
        } while (!valid(addExpenses.trim()));

        appData.addExpenses = addExpenses.toLowerCase().split(', ');

        appData.deposit = confirm('Есть ли у вас депозит в банке?');

        for (let i = 0; i < 2; i++) {
            let key;
            let howMuch;
            
            do {
                key = prompt('Введите обязательную статью расходов?', 'Интернет');
            } while (!valid(key.trim()));
            
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



