import { atom } from 'nanostores';

let initialTransactions = [];

try {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions'));
    initialTransactions = Array.isArray(storedTransactions) ? storedTransactions : [];
} catch (error) {
    console.error("Failed to parse transactions from localStorage:", error);
}


export const transactionsStore = atom(initialTransactions);

export const addTransaction = (transaction) => {
    const currentTransactions = transactionsStore.get();
    const updatedTransactions = [...currentTransactions, transaction];
    setTransactions(updatedTransactions); 
};

export const setTransactions = (transactions) => {
    transactionsStore.set(transactions);
    localStorage.setItem('transactions', JSON.stringify(transactions));
};

export const deleteTransaction = (id) => {
    const currentTransactions = transactionsStore.get();
    const updatedTransactions = Array.isArray(currentTransactions)
        ? currentTransactions.filter(transaction => transaction.id !== id)
        : [];
    setTransactions(updatedTransactions);
};
