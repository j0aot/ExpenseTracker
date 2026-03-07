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
		try {
			const data = await fetchTransactions();
			setTransactions(data);
			setBalance(calcularSaldo(data));
		} catch (err) {
			console.error('Erro ao buscar transações:', err);
		}
	};

	useEffect(() => {
		atualizarDados();
	}, []);

	const handleAddTransaction = async newTransaction => {
		try {
			await addTransaction(newTransaction);
			await atualizarDados();
		} catch (err) {
			console.error('Erro ao adicionar transação:', err);
		}
	};

	const handleEditTransaction = async (id, updatedTransaction) => {
		try {
			await editTransaction(id, updatedTransaction);
			await atualizarDados();
		} catch (err) {
			console.error('Erro ao editar transação:', err);
		}
	};

	const handleRemoveTransaction = async id => {
		try {
			await removeTransaction(id);
			await atualizarDados();
		} catch (err) {
			console.error('Erro ao remover transação:', err);
		}
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
