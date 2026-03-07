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

	const calcularSaldo = data => {
		return data.reduce((acc, t) => (t.type === 'income' ? acc + parseFloat(t.amount) : acc - parseFloat(t.amount)), 0);
	};

	const atualizarDados = async () => {
		const data = await fetchTransactions();
		setTransactions(data);
		setBalance(calcularSaldo(data));
	};

	useEffect(() => {
		atualizarDados();
	}, []);

	const handleAddTransaction = async newTransaction => {
		await addTransaction(newTransaction);
		await atualizarDados();
	};

	const handleEditTransaction = async (id, updatedTransaction) => {
		await editTransaction(id, updatedTransaction);
		await atualizarDados();
	};

	const handleRemoveTransaction = async id => {
		await removeTransaction(id);
		await atualizarDados();
	};

	return (
		<div className='app-container'>
			<Navbar />
			<main className='main-content'>
				<div className='content-wrapper'>
					<Dashboard balance={balance} />
					<TransactionForm addTransaction={handleAddTransaction} />
					<TransactionList transactions={transactions} onEdit={handleEditTransaction} onDelete={handleRemoveTransaction} />
				</div>
			</main>
		</div>
	);
};

export default Home;
