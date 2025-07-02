import { createContext, useContext, useState, useEffect } from 'react';

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
	const [transactions, setTransactions] = useState([]);
	const [filteredTransactions, setFilteredTransactions] = useState([]);
	const [filters, setFilters] = useState({
		type: '',
		category: '',
		startDate: '',
		endDate: '',
	});

	// Carregar transações do localStorage
	useEffect(() => {
		const savedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
		setTransactions(savedTransactions);
	}, []);

	// Salvar transações no localStorage
	useEffect(() => {
		localStorage.setItem('transactions', JSON.stringify(transactions));
	}, [transactions]);

	// Aplicar filtros
	useEffect(() => {
		let result = transactions;

		if (filters.type) {
			result = result.filter(t => t.type === filters.type);
		}

		if (filters.category) {
			result = result.filter(t => t.category === filters.category);
		}

		if (filters.startDate) {
			result = result.filter(t => new Date(t.date) >= new Date(filters.startDate));
		}

		if (filters.endDate) {
			result = result.filter(t => new Date(t.date) <= new Date(filters.endDate));
		}

		setFilteredTransactions(result);
	}, [transactions, filters]);

	const addTransaction = transaction => {
		setTransactions([...transactions, transaction]);
	};

	const updateTransaction = (id, updatedTransaction) => {
		setTransactions(transactions.map(t => (t.id === id ? updatedTransaction : t)));
	};

	const deleteTransaction = id => {
		setTransactions(transactions.filter(t => t.id !== id));
	};

	const getBalance = () => {
		const income = transactions.filter(t => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);

		const expense = transactions.filter(t => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);

		return income - expense;
	};

	const getCategoriesSummary = () => {
		const expenses = transactions.filter(t => t.type === 'expense');
		const categories = {};

		expenses.forEach(t => {
			if (categories[t.category]) {
				categories[t.category] += t.amount;
			} else {
				categories[t.category] = t.amount;
			}
		});

		return Object.entries(categories).map(([name, amount]) => ({
			name,
			amount,
		}));
	};

	return (
		<FinanceContext.Provider
			value={{
				transactions,
				filteredTransactions,
				filters,
				setFilters,
				addTransaction,
				updateTransaction,
				deleteTransaction,
				getBalance,
				getCategoriesSummary,
			}}
		>
			{children}
		</FinanceContext.Provider>
	);
};

export const useFinance = () => useContext(FinanceContext);
