'use strict';

const startButton = document.getElementById('start');
const addIncomeButton = document.getElementsByTagName('button')[0];
const addExpenseButton = document.getElementsByTagName('button')[1];
const depositCheckbox = document.querySelector('#deposit-check');
const addIncomeInputs = document.querySelectorAll('.additional_income-item');
const budgetMonthValue = document.getElementsByClassName('budget_month-value')[0];
const budgetDayValue = document.getElementsByClassName('budget_day-value')[0];
const expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0];
const addIncomeValue = document.getElementsByClassName('additional_income-value')[0];
const addExpensesValue = document.getElementsByClassName('additional_expenses-value')[0];
const periodValue = document.getElementsByClassName('income_period-value')[0];
const targetMonthValue = document.getElementsByClassName('target_month-value')[0];
const salaryInput = document.querySelector('.salary-amount');
const incomeTitleInput = document.querySelector('.income-title');
const addIncomeItem1 = document.querySelectorAll('.additional_income-item')[0];
const addIncomeItem2 = document.querySelectorAll('.additional_income-item')[1];
const expensesTitleInput = document.querySelector('.expenses-title');
const expensesAmountInput = document.querySelector('.expenses-amount');
const targetAmountInput = document.querySelector('.target-amount');
const periodSelectInput = document.querySelector('.period-select');
const periodSelectTitle = document.querySelector('.period-amount');
const addExpensesItem = document.querySelector('.additional_expenses-item');
const dataBlock = document.querySelector('.data');
let expensesItems = document.querySelectorAll('.expenses-items');
let incomeItems = document.querySelectorAll('.income-items');

let isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let appData = {
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    start: function() {
        appData.budget = +salaryInput.value;

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();

        appData.showResult();
    },
    showResult: function() {
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        addExpensesValue.value = appData.addExpenses.join(', ');
        addIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        periodValue.value = appData.calcPeriod();

        periodSelectInput.addEventListener('input', function() {
            periodValue.value = appData.calcPeriod();
        });
    },
    addIncomeBlock: function() {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, addIncomeButton);

        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length === 3) {
            addIncomeButton.style.display = 'none';
        }
    },
    addExpensesBlock: function() {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, addExpenseButton);

        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            addExpenseButton.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;

            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = +cashExpenses;
            }
        });
    },
    getIncome: function() {
        incomeItems.forEach(function(item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;

            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = +cashIncome;
            }
        });

        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },
    getAddExpenses: function() {
        let addExpenses = addExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        });
    },
    getAddIncome: function() {
        addIncomeInputs.forEach(function(item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },
    getExpensesMonth: function() {
        for (let expense in appData.expenses) {
           appData.expensesMonth += +appData.expenses[expense];
        }
        
        return appData.expensesMonth;
    },
    getBudget: function() {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
    },
    getTargetMonth: function() {
        return targetAmountInput.value / appData.budgetMonth;
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
    calcPeriod: function(){
        return appData.budgetMonth * periodSelectInput.value;
    }
};

startButton.addEventListener('click', appData.start);

addIncomeButton.addEventListener('click', appData.addIncomeBlock);
addExpenseButton.addEventListener('click', appData.addExpensesBlock);
periodSelectInput.addEventListener('input', function() {
    periodSelectTitle.textContent = periodSelectInput.value;
});

startButton.setAttribute('disabled', '');

salaryInput.addEventListener('input', function() {
    if (salaryInput.value.trim()) {
        startButton.removeAttribute('disabled');
    } else {
        startButton.setAttribute('disabled', '');
    }
});

dataBlock.addEventListener('input', function(event) {
    const target = event.target;
    const placeholder = target.attributes.placeholder.textContent;
    
    if (placeholder === 'Сумма') { 
        target.value = target.value.replace(/[^\d]/g, '');
    }

    if (placeholder === 'Наименование') {  
        target.value = target.value.replace(/[^,.;:а-яА-ЯёЁ\s]+$/, '');
    }
});

// let getData = function() {
//     console.log('Расходы за месяц: ' + appData.expensesMonth);
//     console.log(appData.getTargetMonth());
//     console.log(appData.getStatusIncome());
    
//     console.log('Наша программа включает в себя данные:');
//     for (let data in appData) {
//         if (appData[data] !== Object(appData[data])) {
//             console.log(data + ' : ' + appData[data]);
//         } else if (typeof appData[data] === 'object') {
//             console.log(data + ':');
//             console.log(appData[data]);
//         }
//     }
// };

// getData();

// console.log(
//     appData.addExpenses
//     .map(expense => expense.charAt(0).toUpperCase() + expense.slice(1))
//     .join(', ')
// );



