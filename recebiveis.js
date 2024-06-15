document.addEventListener('DOMContentLoaded', loadTransactions);
document.getElementById('transaction-form').addEventListener('submit', addTransaction);

let transactions = [];

function addTransaction(e) {
    e.preventDefault();

    const date = document.getElementById('data').value;
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);

    const transaction = {
        date,
        description,
        amount
    };

    transactions.push(transaction);
    saveTransactions();
    updateTransactionTable();
    document.getElementById('transaction-form').reset();
}

function updateTransactionTable() {
    const tbody = document.getElementById('transactions-table').querySelector('tbody');
    tbody.innerHTML = '';

    transactions.forEach((transaction, index) => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${formatDate(transaction.date)}</td>
            <td>${transaction.description}</td>
            <td>${formatCurrency(transaction.amount.toFixed(2))}</td>
            <td><button onclick="removeTransaction(${index})">Remover</button></td>
            <input type="checkbox" id="check" nome="check" value="check">
        `;

        tbody.appendChild(tr);
    });
}

function removeTransaction(index) {
    transactions.splice(index, 1);
    saveTransactions();
    updateTransactionTable();
}

function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function loadTransactions() {
    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
        transactions = JSON.parse(storedTransactions);
        updateTransactionTable();
    }
}

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Intl.DateTimeFormat('pt-BR', options).format(new Date(dateString));
}