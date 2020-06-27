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
const depositBank = document.querySelector('.deposit-bank');
const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
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
        this.getAdd();
        this.getExpensesMonth();
        this.getInfoDeposit();
        this.getBudget();
    
        this.showResult();
    }

    reset() {
        const inputs = dataBlock.querySelectorAll('[type="text"]');
        const resultInputs = document.querySelectorAll('input');
        const depositInputs = document.querySelectorAll('.deposit-amount, .deposit-percent, .deposit-bank');
        
        inputs.forEach((input) => {
            input.value = '';
        });

        resultInputs.forEach((input) => {
            input.value = '';
        });

        depositInputs.forEach((input) => {
            input.style.display = 'none';
        });

        periodSelectInput.value = 1;
        periodSelectTitle.textContent = '1';
        depositCheckbox.checked = false;

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
        const inputs = dataBlock.querySelectorAll('[type="text"], [type="checkbox"], select');
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

    addBlock(typeOfBlock) {
        let items = typeOfBlock === 'income' ? incomeItems : expensesItems;
        const button = typeOfBlock === 'income' ? addIncomeButton : addExpenseButton;
        const clone = items[0].cloneNode(true);
        const parent = items[0].parentNode;

        clone.querySelector(`.${typeOfBlock}-title`).value = '';
        clone.querySelector(`.${typeOfBlock}-amount`).value = '';
        parent.insertBefore(clone, button);

        items = document.querySelectorAll(`.${typeOfBlock}-items`);

        if (items.length === 3) {
            button.style.display = 'none';
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

    getAdd() {
        const addExpenses = addExpensesItem.value.split(',');
        const addIncomes = [];
        
        addIncomeInputs.forEach(item => {
            addIncomes.push(item.value.trim());
        });

        const getAddIncExp = (arr) => {
            arr.forEach(item => {
                if (item !== '') {
                    if (arr === addExpenses) {
                        this.addExpenses.push(item);
                    }

                    if (arr === addIncomes) {
                        this.addIncome.push(item);
                    }
                }
            });
        };

        getAddIncExp(addExpenses);
        getAddIncExp(addIncomes);
    }

    getExpensesMonth() {
        for (const expense in this.expenses) {
            this.expensesMonth += +this.expenses[expense];
        }
        
        return this.expensesMonth;
    }

    getBudget() {
        const monthDeposit = Math.ceil(this.moneyDeposit * (this.percentDeposit / 100));
        this.budgetMonth = Math.ceil(this.budget + this.incomeMonth - this.expensesMonth + monthDeposit);
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
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    }

    calcPeriod() {
        return this.budgetMonth * periodSelectInput.value;
    }

    changePercent() {
        const valueSelect = this.value;
        if (valueSelect === 'other') {
            depositPercent.value = '';
            depositPercent.style.display = 'inline-block';
            depositPercent.removeAttribute('disabled');
        } else {
            depositPercent.value = valueSelect;
            depositPercent.style.display = 'none';
            depositPercent.setAttribute('disabled', true);
        }
    }

    depositHandler() {
        if (depositCheckbox.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            depositPercent.value = '';
            depositPercent.setAttribute('disabled', true);
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePercent);
        }
    }

    eventsListeners () {
        startButton.addEventListener('click', this.start.bind(this));

        addIncomeButton.addEventListener('click', this.addBlock.bind(this, 'income'));
        addExpenseButton.addEventListener('click', this.addBlock.bind(this, 'expenses'));

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

        depositCheckbox.addEventListener('change', this.depositHandler.bind(this));

        depositPercent.addEventListener('input', () => {
            let value = depositPercent.value;
            if (!isNumber(value) || value < 0 || value > 100) {
                depositPercent.value = '';
            }
        });
    }
}

const appData = new AppData();
const copy = Object.assign({}, new AppData());


appData.eventsListeners();



