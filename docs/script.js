


let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category_select');
const amountin = document.getElementById('amount_in');
const infoInput = document.getElementById('info');
const dateInput = document.getElementById('date_in');
const addBtn = document.getElementById('add_btn');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountCell = document.getElementById('total-amount');

addBtn.addEventListener('click', function() {
    const category = categorySelect.value;
    const amount = Number(amountin.value);
    const date = dateInput.value;
    const info = infoInput.value;

    // Validation checks
    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (info === '') {
        alert('Please enter valid info');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    const expense = { category, amount, info, date };
    expenses.push(expense);

    // Update total amount based on category
    if (category === 'Income') {
        totalAmount += amount;
    } else if (category === 'Expense') {
        totalAmount -= amount;
    }

    // Update the table
    const newRow = expenseTableBody.insertRow();
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const infoCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();

    categoryCell.textContent = category;
    amountCell.textContent = amount;
    infoCell.textContent = info;
    dateCell.textContent = date;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        const expenseIndex = expenses.indexOf(expense);
        if (expenseIndex > -1) {
            expenses.splice(expenseIndex, 1);
            if (category === 'Income') {
                totalAmount -= amount;
            } else if (category === 'Expense') {
                totalAmount += amount;
            }
            updateTotalAmount();
            expenseTableBody.removeChild(newRow);
        }
    });

   

    deleteCell.appendChild(deleteBtn);
    // Update the total amount display
    updateTotalAmount();
});

function updateTotalAmount() {
    totalAmountCell.textContent = totalAmount;
}

// Initial load
updateTotalAmount();

// Handling existing expenses (if any) and recalculating total amount on load
//expenses.forEach(expense => {
    

for(const expense of expenses){
    if (expense.category === 'Income') {
        totalAmount += expense.amount;
    } else if (expense.category === 'Expense') {
        totalAmount -= expense.amount;
    }
    const newRow = expenseTableBody.insertRow();
    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const infoCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    
    categoryCell.textContent = category;
    amountCell.textContent = amountin;
    infoCell.textContent = info;
    dateCell.textContent = date;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function() {
        const expenseIndex = expenses.indexOf(expense);
        if (expenseIndex > -1) {
            expenses.splice(expenseIndex, 1);
            if (expense.category === 'Income') {
                totalAmount -= expense.amount;
            } else if (expense.category === 'Expense') {
                totalAmount += expense.amount;
            }
            updateTotalAmount();
            expenseTableBody.removeChild(newRow);
        }
    });
    
    
    deleteCell.appendChild(deleteBtn);
};

// Update the total amount display initially
updateTotalAmount();