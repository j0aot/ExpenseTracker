import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import './TransactionList.css';

const TransactionList = () => {
	const { filteredTransactions, filters, setFilters, updateTransaction, deleteTransaction } = useFinance();

	const [editingId, setEditingId] = useState(null);
	const [editForm, setEditForm] = useState({
		description: '',
		amount: '',
		category: '',
		date: '',
	});

	const categories = {
		expense: ['alimentacao', 'combustivel', 'renda', 'lazer', 'saude', 'transporte', 'outros'],
		income: ['salario', 'freelance', 'investimentos', 'presente', 'outros'],
	};

	const handleEditClick = transaction => {
		setEditingId(transaction.id);
		setEditForm({
			description: transaction.description,
			amount: transaction.amount,
			category: transaction.category,
			date: transaction.date,
		});
	};

	const handleEditChange = e => {
		const { name, value } = e.target;
		setEditForm({
			...editForm,
			[name]: value,
		});
	};

	const handleEditSubmit = id => {
		const updatedTransaction = {
			id,
			description: editForm.description,
			amount: parseFloat(editForm.amount),
			category: editForm.category,
			date: editForm.date,
		};

		updateTransaction(id, updatedTransaction);
		setEditingId(null);
	};

	const handleFilterChange = e => {
		const { name, value } = e.target;
		setFilters({
			...filters,
			[name]: value,
		});
	};

	const resetFilters = () => {
		setFilters({
			type: '',
			category: '',
			startDate: '',
			endDate: '',
		});
	};

	return (
		<div className='transaction-list'>
			<h2>Transações</h2>

			<div className='filters'>
				<div className='filter-group'>
					<label>Tipo</label>
					<select name='type' value={filters.type} onChange={handleFilterChange}>
						<option value=''>Todos</option>
						<option value='income'>Receitas</option>
						<option value='expense'>Despesas</option>
					</select>
				</div>

				<div className='filter-group'>
					<label>Categoria</label>
					<select name='category' value={filters.category} onChange={handleFilterChange}>
						<option value=''>Todas</option>
						{[...categories.expense, ...categories.income].map(category => (
							<option key={category} value={category}>
								{category.charAt(0).toUpperCase() + category.slice(1)}
							</option>
						))}
					</select>
				</div>

				<div className='filter-group'>
					<label>De</label>
					<input type='date' name='startDate' value={filters.startDate} onChange={handleFilterChange} />
				</div>

				<div className='filter-group'>
					<label>Até</label>
					<input type='date' name='endDate' value={filters.endDate} onChange={handleFilterChange} />
				</div>

				<button type='button' onClick={resetFilters} className='reset-btn'>
					Limpar Filtros
				</button>
			</div>

			{filteredTransactions.length === 0 ? (
				<p className='no-transactions'>Nenhuma transação encontrada.</p>
			) : (
				<ul className='transactions'>
					{filteredTransactions.map(transaction => (
						<li key={transaction.id} className={`transaction ${transaction.type}`}>
							{editingId === transaction.id ? (
								<div className='edit-form'>
									<input type='text' name='description' value={editForm.description} onChange={handleEditChange} />
									<input type='number' name='amount' value={editForm.amount} onChange={handleEditChange} min='0.01' step='0.01' />
									<select name='category' value={editForm.category} onChange={handleEditChange}>
										{categories[transaction.type].map(category => (
											<option key={category} value={category}>
												{category.charAt(0).toUpperCase() + category.slice(1)}
											</option>
										))}
									</select>
									<input type='date' name='date' value={editForm.date} onChange={handleEditChange} />
									<div className='edit-actions'>
										<button type='button' onClick={() => handleEditSubmit(transaction.id)} className='save-btn'>
											Salvar
										</button>
										<button type='button' onClick={() => setEditingId(null)} className='cancel-btn'>
											Cancelar
										</button>
									</div>
								</div>
							) : (
								<>
									<div className='transaction-info'>
										<span className='description'>{transaction.description}</span>
										<span className='category'>{transaction.category}</span>
										<span className='date'>{new Date(transaction.date).toLocaleDateString('pt-PT')}</span>
										<span className={`amount ${transaction.type}`}>
											{transaction.type === 'income' ? '+' : '-'}
											{transaction.amount.toFixed(2)}€
										</span>
									</div>
									<div className='transaction-actions'>
										<button onClick={() => handleEditClick(transaction)} className='edit-btn'>
											Editar
										</button>
										<button onClick={() => deleteTransaction(transaction.id)} className='delete-btn'>
											Apagar
										</button>
									</div>
								</>
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default TransactionList;
