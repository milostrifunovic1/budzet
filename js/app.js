class UI {
  constructor() {
    
    this.budgetForm = document.getElementById("budzet-form");
    this.budgetInput = document.getElementById("budzet-input");
    this.budgetAmount = document.getElementById("sredstva-suma");
    this.expenseAmount = document.getElementById("troskovi-suma");
    this.balance = document.getElementById("stanje");
    this.balanceAmount = document.getElementById("stanje-suma");
    this.expenseForm = document.getElementById("troskovi-form");
    this.expenseInput = document.getElementById("naziv-troskova");
    this.amountInput = document.getElementById("troskovi-input");
    this.expenseList = document.getElementById("lista-troskova");
    this.alertB = document.getElementById("alertB"); //budget alert
    this.alertA = document.getElementById("alertA"); //amount alert
    this.alertE = document.getElementById("alertE"); //expenses alert
    this.itemList = [];
    this.itemID = 0;
    
  }
    submitBudgetForm(){
        const value = this.budgetInput.value;
        if(value===''){
            this.alertB.style.color = 'red';
            this.alertB.innerHTML ='iznos vaših sredstava je obavezan!';
        } 
        else if (value<0){
            this.alertB.style.color = 'red';
            this.alertB.innerHTML ='Sredstva ne mogu biti u minusu!';
        } 
        else {
            this.budgetAmount.textContent = value;
            this.budgetInput.value = '';
            this.showBalance();
        }
        
        const timeout = this;
        setTimeout(function(){
            timeout.alertB.style.color = 'black';
            timeout.alertB.innerHTML = 'unesite vaša sredstva';
        },3000);
    }
    submitExpensesForm(){
        const expenseValue = this.expenseInput.value;
        const expenseAmount = this.amountInput.value;

        if(expenseValue===''){
            this.expenseInput.style.border = '3px solid';
            this.alertE.style.color = '#dc3545';
           
            
        }
        else if(expenseAmount==='' || expenseAmount<=0){
            this.amountInput.style.border = '3px solid';
            this.alertA.style.color = '#dc3545';
        }
        else{
            this.expenseInput.value = '';
            this.amountInput.value = '';
        }
            let expense = {
                id: this.itemID,
                title: expenseValue,
                amount: parseInt(expenseAmount),
            }
        if(expenseAmount>0 & expenseValue.length>0){
            this.itemID++;            
            this.itemList.push(expense);
            this.addExpense(expense);
            this.showBalance();
        };
        const timeouts = this;
        setTimeout(function(){
            timeouts.expenseInput.style.border = '1px solid';
            timeouts.alertE.style.color = 'black';
            timeouts.amountInput.style.border = '1px solid';
            timeouts.alertA.style.color = 'black';
      },2000);
    }
    addExpense(expense){   
        const div = document.createElement("div");
        div.classList.add("expense");
        div.innerHTML = `<div class="expense-item d-flex align-items-baseline"><h6 id="kol" class="expense-title mb-0  list-item font-italic kol">${expense.title}</h6><h6 id="kol1" class="expense-amount mb-0 list-item font-italic font-weight-bold">${expense.amount}</h6><div  class="expense-icons list-item"><a id="kol2" class="delete-icon text-danger" data-id="${expense.id}"><i class="fas fa-trash"></i></a></div></div>`;
        
        this.expenseList.appendChild(div);
    }
    showBalance(){
        const expenses = this.totalExpenses();
        const total = parseInt(this.budgetAmount.textContent) - expenses;
        this.balanceAmount.textContent = total;
        if(total<0){
            this.balance.style.color = '#dc3545';
        }
        else {
            this.balance.style.color = '#28a745';
        }
    }
    totalExpenses(){
        let total = 0;
        if(this.itemList.length>0){
            total = this.itemList.reduce(function(acc, cur){
                acc += cur.amount;
                return acc;
            },0);
        }
        this.expenseAmount.textContent = total;
        return total;

    }
    deleteExpenses(element){
        let id = parseInt(element.dataset.id);
        let parent = element.parentElement.parentElement.parentElement;
        this.expenseList.removeChild(parent);
        
        let tempList = this.itemList.filter(function(item){
           return item.id !== id; 
        });
        this.itemList = tempList;
        this.showBalance();
    }
}

function eventListeners(){
    const budgetForm = document.getElementById('budzet-form');
    const expenseForm = document.getElementById('troskovi-form');
    const expenseList = document.getElementById('lista-troskova');
    
    //new instance of UI class
    const ui = new UI();
    
    //budget submit
    budgetForm.addEventListener('submit', function(event){
        event.preventDefault();
        ui.submitBudgetForm();
    });
    //expense submit
    expenseForm.addEventListener('submit', function(event){
        event.preventDefault();
        ui.submitExpensesForm();
    });
    //expense list click
    expenseList.addEventListener('click', function(event){
       if(event.target.parentElement.classList.contains('delete-icon')){
           ui.deleteExpenses(event.target.parentElement);
       }        
    });
}

document.addEventListener('DOMContentLoaded', function(){
    eventListeners();
})


