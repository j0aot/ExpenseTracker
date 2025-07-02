import React, { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Dashboard from '../components/Dashboard/Dashboard';
import TransactionForm from '../components/TransactionForm/TransactionForm';
import TransactionList from '../components/TransactionList/TransactionList';

const Home = () => {
	const [transactions, setTransactions] = useState([]);
	const [balance, setBalance] = useState(0);

	const addTransaction = newTransaction => {
		if (newTransaction.type === 'income') {
			setBalance(prevBalance => prevBalance + parseFloat(newTransaction.amount));
		} else if (newTransaction.type === 'expense') {
			setBalance(prevBalance => prevBalance - parseFloat(newTransaction.amount));
			setTransactions(prevTransactions => [...prevTransactions, newTransaction]);
		}
	};

	const editTransaction = (id, updatedTransaction) => {
		setTransactions(prevTransactions => prevTransactions.map(transaction => (transaction.id === id ? updatedTransaction : transaction)));

		// Atualizar o saldo
		const originalTransaction = transactions.find(t => t.id === id);
		if (originalTransaction) {
			if (originalTransaction.type === 'expense') {
				setBalance(prevBalance => prevBalance + parseFloat(originalTransaction.amount));
			}

			if (updatedTransaction.type === 'expense') {
				setBalance(prevBalance => prevBalance - parseFloat(updatedTransaction.amount));
			}
		}
	};

	const removeTransaction = id => {
		const transactionToRemove = transactions.find(t => t.id === id);
		if (transactionToRemove && transactionToRemove.type === 'expense') {
			setBalance(prevBalance => prevBalance + parseFloat(transactionToRemove.amount));
		}
		setTransactions(prevTransactions => prevTransactions.filter(transaction => transaction.id !== id));
	};

	return (
		<div className='app-container'>
			<Navbar />

			<main className='main-content'>
				<div className='content-wrapper'>
					<Dashboard balance={balance} />
					<TransactionForm addTransaction={addTransaction} />
					<TransactionList transactions={transactions} editTransaction={editTransaction} removeTransaction={removeTransaction} />
				</div>
			</main>
		</div>
	);
};

export default Home;
