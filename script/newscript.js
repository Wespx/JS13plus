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

const isNumber = (n) => {
    return !isNaN(parseFloat(n)) && isFinite(n);
};

class AppData {
    constructor () {
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
    }

    start() {
        this.toggleDisabled();
        startButton.style.display = 'none';
        cancelButton.style.display = 'block';
        
        this.budget = +salaryInput.value;
    
        this.getExpInc();
        this.getExpensesMonth();
        this.getAddExpenses();
        this.getAddIncome();
        this.getBudget();
    
        this.showResult();
    }

    reset() {
        const inputs = dataBlock.querySelectorAll('[type="text"]');
        const resultInputs = document.querySelectorAll('input');
        
        inputs.forEach((input) => {
            input.value = '';
        });

        resultInputs.forEach((input) => {
            input.value = '';
        });

        periodSelectInput.value = 1;
        periodSelectTitle.textContent = '1';

        this.toggleDisabled();
        
        for (const key in copy) {
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
    }

    toggleDisabled() {
        const inputs = dataBlock.querySelectorAll('[type="text"], [type="checkbox"]');
        const buttons = dataBlock.querySelectorAll('button');
        
        inputs.forEach((input) => {
            input.toggleAttribute('disabled');
        });

        buttons.forEach((button) => {
            button.toggleAttribute('disabled');
        });
    }

    showResult() {
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        addExpensesValue.value = this.addExpenses.join(', ');
        addIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        periodValue.value = this.calcPeriod();

        periodSelectInput.addEventListener('input', () => {
            periodValue.value = this.calcPeriod();
        });
    }

    addIncomeBlock() {
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, addIncomeButton);

        incomeItems = document.querySelectorAll('.income-items');

        if (incomeItems.length === 3) {
            addIncomeButton.style.display = 'none';
        }
    }

    addExpensesBlock() {
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, addExpenseButton);

        expensesItems = document.querySelectorAll('.expenses-items');

        if (expensesItems.length === 3) {
            addExpenseButton.style.display = 'none';
        }
    }

    getExpInc() {
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = +itemAmount;
            }
        };
        
        expensesItems.forEach(count);
        incomeItems.forEach(count);

        for (const key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    }

    getAddExpenses() {
        const addExpenses = addExpensesItem.value.split(',');
        addExpenses.forEach((item) => {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        });
    }

    getAddIncome() {
        addIncomeInputs.forEach((item) => {
            const itemValue = item.value.trim();
            if (itemValue !== '') {
                this.addIncome.push(itemValue);
            }
        });
    }

    getExpensesMonth() {
        for (const expense in this.expenses) {
            this.expensesMonth += +this.expenses[expense];
        }
        
        return this.expensesMonth;
    }

    getBudget() {
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
        this.budgetDay = Math.ceil(this.budgetMonth / 30);
    }

    getTargetMonth() {
        return targetAmountInput.value / this.budgetMonth;
    }

    getStatusIncome() {
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
    }

    getInfoDeposit() {
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
    }

    calcPeriod() {
        return this.budgetMonth * periodSelectInput.value;
    }

    eventsListeners () {
        startButton.addEventListener('click', this.start.bind(this));

        addIncomeButton.addEventListener('click', this.addIncomeBlock.bind(this));
        addExpenseButton.addEventListener('click', this.addExpensesBlock.bind(this));

        periodSelectInput.addEventListener('input', () => {
            periodSelectTitle.textContent = periodSelectInput.value;
        });

        startButton.setAttribute('disabled', '');

        cancelButton.addEventListener('click', this.reset.bind(this));

        salaryInput.addEventListener('input', () => {
            if (salaryInput.value.trim()) {
                startButton.removeAttribute('disabled');
            } else {
                startButton.setAttribute('disabled', '');
            }
        });

        dataBlock.addEventListener('input', (event) => {
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
    }
}

const appData = new AppData();
const copy = Object.assign({}, new AppData());


appData.eventsListeners();



