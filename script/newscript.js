'use strict';

const startButton = document.getElementById('start');
const cancelButton = document.getElementById('cancel');
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

const isNumber = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const AppData = function () {
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
};

AppData.prototype.start = function() {
    this.toggleDisabled();
    startButton.style.display = 'none';
    cancelButton.style.display = 'block';
    
    this.budget = +salaryInput.value;

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getBudget();

    this.showResult();
};

AppData.prototype.reset = function() {
    const inputs = dataBlock.querySelectorAll('[type="text"]');
    const resultInputs = document.querySelectorAll('input');
    
    inputs.forEach(function(input) {
        input.value = '';
    });

    resultInputs.forEach(function(input) {
        input.value = '';
    });

    periodSelectInput.value = 1;
    periodSelectTitle.textContent = '1';

    this.toggleDisabled();
    
    for (let key in copy) {
        this[key] = copy[key];
    }

    incomeItems = document.getElementsByClassName('income-items');
    while (incomeItems.length > 1) {
        incomeItems[incomeItems.length - 1].remove();
    }
    incomeItems = document.querySelectorAll('.income-items');

    expensesItems = document.getElementsByClassName('expenses-items');
    while (expensesItems.length > 1) {
        expensesItems[expensesItems.length - 1].remove();
    }
    expensesItems = document.querySelectorAll('.expenses-items');
    
    addIncomeButton.style.display = '';
    addExpenseButton.style.display = '';

    cancelButton.style.display = 'none';
    startButton.style.display = 'block';
    startButton.setAttribute('disabled', '');
};

AppData.prototype.toggleDisabled = function() {
    const inputs = dataBlock.querySelectorAll('[type="text"], [type="checkbox"]');
    const buttons = dataBlock.querySelectorAll('button');
    
    inputs.forEach(function(input) {
        input.toggleAttribute('disabled');
    });

    buttons.forEach(function(button) {
        button.toggleAttribute('disabled');
    });
};

AppData.prototype.showResult = function() {
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    addExpensesValue.value = this.addExpenses.join(', ');
    addIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    periodValue.value = this.calcPeriod();

    periodSelectInput.addEventListener('input', function() {
        periodValue.value = this.calcPeriod();
    }.bind(this));
};

AppData.prototype.addIncomeBlock = function() {
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    cloneIncomeItem.querySelector('.income-title').value = '';
    cloneIncomeItem.querySelector('.income-amount').value = '';
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, addIncomeButton);

    incomeItems = document.querySelectorAll('.income-items');

    if (incomeItems.length === 3) {
        addIncomeButton.style.display = 'none';
    }
};

AppData.prototype.addExpensesBlock = function() {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    cloneExpensesItem.querySelector('.expenses-title').value = '';
    cloneExpensesItem.querySelector('.expenses-amount').value = '';
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, addExpenseButton);

    expensesItems = document.querySelectorAll('.expenses-items');

    if (expensesItems.length === 3) {
        addExpenseButton.style.display = 'none';
    }
};

AppData.prototype.getExpenses = function() {
    expensesItems.forEach(function(item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;

        if (itemExpenses !== '' && cashExpenses !== '') {
            this.expenses[itemExpenses] = +cashExpenses;
        }
    }, this);
};

AppData.prototype.getIncome = function() {
    incomeItems.forEach(function(item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        
        if (itemIncome !== '' && cashIncome !== '') {
            this.income[itemIncome] = +cashIncome;
        }
    }, this);

    for (let key in this.income) {
        this.incomeMonth += +this.income[key];
    }
};

AppData.prototype.getAddExpenses = function() {
    let addExpenses = addExpensesItem.value.split(',');
    addExpenses.forEach(function(item) {
        item = item.trim();
        if (item !== '') {
            this.addExpenses.push(item);
        }
    }, this);
};

AppData.prototype.getAddIncome = function() {
    addIncomeInputs.forEach(function(item) {
        let itemValue = item.value.trim();
        if (itemValue !== '') {
            this.addIncome.push(itemValue);
        }
    }, this);
};

AppData.prototype.getExpensesMonth = function() {
    for (let expense in this.expenses) {
       this.expensesMonth += +this.expenses[expense];
    }
    
    return this.expensesMonth;
};

AppData.prototype.getBudget = function() {
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
    this.budgetDay = Math.ceil(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function() {
    return targetAmountInput.value / this.budgetMonth;
};

AppData.prototype.getStatusIncome = function() {
    if (this.budget >= 1200) {
        return ('У вас высокий уровень дохода');
    } else if (this.budget >= 600 && this.budget < 1200) {
        return ('У вас средний уровень дохода');
    } else if (this.budget > 0 && this.budget < 600) {
        return ('У вас уровень дохода ниже среднего');
    } else if (this.budget === 0) {
        return ('У вас нет дохода');
    } else {
        return ('Что-то пошло не так');
    }
};

AppData.prototype.getInfoDeposit = function() {
    if(this.deposit) {
        let percent;
        let amount;

        do {
            percent = prompt('Какой годовой процент?', '10');
        } while (!isNumber(percent));
        
        do {
            amount = prompt('Какая сумма вложена?', '10000');
        } while (!isNumber(amount));
        
        this.percentDeposit = percent;
        this.moneyDeposit = amount;
    }
};

AppData.prototype.calcPeriod = function(){
    return this.budgetMonth * periodSelectInput.value;
};

AppData.prototype.eventsListeners = function() {
   startButton.addEventListener('click', this.start.bind(this));

    addIncomeButton.addEventListener('click', this.addIncomeBlock.bind(this));
    addExpenseButton.addEventListener('click', this.addExpensesBlock.bind(this));
    periodSelectInput.addEventListener('input', function() {
        periodSelectTitle.textContent = periodSelectInput.value;
    });

    startButton.setAttribute('disabled', '');

    cancelButton.addEventListener('click', this.reset.bind(this));

    salaryInput.addEventListener('input', function() {
        if (salaryInput.value.trim()) {
            startButton.removeAttribute('disabled');
        } else {
            startButton.setAttribute('disabled', '');
        }
    });

    dataBlock.addEventListener('input', function(event) {
        const target = event.target;

        if (target.hasAttribute('placeholder')) {
            const placeholder = target.attributes.placeholder.textContent;
            
            if (placeholder === 'Сумма') { 
                target.value = target.value.replace(/[^\d]/g, '');
            }

            if (placeholder === 'Наименование') {  
                target.value = target.value.replace(/[^,.;:а-яА-ЯёЁ\s]+$/, '');
            }
        }
    });
};

const appData = new AppData();
const copy = Object.assign({}, new AppData());


appData.eventsListeners();



