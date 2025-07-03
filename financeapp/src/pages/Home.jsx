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
			console.log('Transações recebidas:', data);
			setTransactions(data);
			const saldo = data.reduce((acc, t) => (t.type === 'income' ? acc + parseFloat(t.amount) : acc - parseFloat(t.amount)), 0);
			setBalance(saldo);
		});
	}, []);

	const handleAddTransaction = async newTransaction => {
		await addTransaction(newTransaction);
		const data = await fetchTransactions();
		setTransactions(data);
		const saldo = data.reduce((acc, t) => (t.type === 'income' ? acc + parseFloat(t.amount) : acc - parseFloat(t.amount)), 0);
		setBalance(saldo);
	};

	const handleEditTransaction = async (id, updatedTransaction) => {
		await editTransaction(id, updatedTransaction);
		const data = await fetchTransactions();
		setTransactions(data);
		const saldo = data.reduce((acc, t) => (t.type === 'income' ? acc + parseFloat(t.amount) : acc - parseFloat(t.amount)), 0);
		setBalance(saldo);
	};

	const handleRemoveTransaction = async id => {
		await removeTransaction(id);
		const data = await fetchTransactions();
		setTransactions(data);
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
