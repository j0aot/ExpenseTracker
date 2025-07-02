import React, { useEffect, useState } from 'react';
import { useTransactionsApi } from '../hooks/useTransactionsApi';
import Navbar from '../components/Navbar/Navbar';
import Dashboard from '../components/Dashboard/Dashboard';
import TransactionForm from '../components/TransactionForm/TransactionForm';
import TransactionList from '../components/TransactionList/TransactionList';

const Home = () => {
	const [transactions, setTransactions] = useState([]);
	const [balance, setBalance] = useState(0);
	const { fetchTransactions, addTransaction, editTransaction, removeTransaction } = useTransactionsApi();

	useEffect(() => {
		fetchTransactions().then(data => {
			setTransactions(data.filter(t => t.type === 'expense'));
			// Calcula o saldo: receitas - despesas
			const saldo = data.reduce((acc, t) => (t.type === 'income' ? acc + parseFloat(t.amount) : acc - parseFloat(t.amount)), 0);
			setBalance(saldo);
		});
	}, []);

	const handleAddTransaction = async newTransaction => {
		const saved = await addTransaction(newTransaction);
		if (saved.type === 'expense') {
			setTransactions(prev => [...prev, saved]);
		}
		setBalance(prev => (saved.type === 'income' ? prev + parseFloat(saved.amount) : prev - parseFloat(saved.amount)));
	};

	const handleEditTransaction = async (id, updatedTransaction) => {
		const updated = await editTransaction(id, updatedTransaction);
		setTransactions(prev => prev.map(t => (t._id === id ? updated : t)));
		// Recomenda-se recarregar todas as transações e recalcular saldo após edição
		const data = await fetchTransactions();
		setTransactions(data.filter(t => t.type === 'expense'));
		const saldo = data.reduce((acc, t) => (t.type === 'income' ? acc + parseFloat(t.amount) : acc - parseFloat(t.amount)), 0);
		setBalance(saldo);
	};

	const handleRemoveTransaction = async id => {
		await removeTransaction(id);
		const data = await fetchTransactions();
		setTransactions(data.filter(t => t.type === 'expense'));
		const saldo = data.reduce((acc, t) => (t.type === 'income' ? acc + parseFloat(t.amount) : acc - parseFloat(t.amount)), 0);
		setBalance(saldo);
	};

	return (
		<div className='app-container'>
			<Navbar />
			<main className='main-content'>
				<div className='content-wrapper'>
					<Dashboard balance={balance} />
					<TransactionForm addTransaction={handleAddTransaction} />
					<TransactionList transactions={transactions} editTransaction={handleEditTransaction} removeTransaction={handleRemoveTransaction} />
				</div>
			</main>
		</div>
	);
};

export default Home;
