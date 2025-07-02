import React from 'react';
import './TransactionList.css';

const TransactionList = ({ transactions, onDelete, onEdit }) => {
	const formatCurrency = amount => {
		return new Intl.NumberFormat('pt-PT', {
			style: 'currency',
			currency: 'EUR',
		}).format(amount);
	};

	const formatCategory = category => {
		return category.charAt(0).toUpperCase() + category.slice(1);
	};

	const formatDate = dateString => {
		const date = new Date(dateString);
		return date.toLocaleDateString('pt-PT');
	};

	return (
		<div className='transaction-list'>
			<h2>Transações Recentes</h2>
			{transactions.length === 0 ? (
				<p>Nenhuma transação registada</p>
			) : (
				<ul>
					{transactions.map(transaction => (
						<li key={transaction.id} className={transaction.type}>
							<div className='transaction-info'>
								<span className='description'>{transaction.description}</span>
								<span className='category'>{formatCategory(transaction.category)}</span>
								<span className='date'>{formatDate(transaction.date)}</span>
							</div>
							<div className='transaction-amount'>
								<span>{formatCurrency(transaction.type === 'expense' ? -Math.abs(transaction.amount) : Math.abs(transaction.amount))}</span>
							</div>
							<div className='transaction-actions'>
								<button onClick={() => onEdit(transaction)} className='edit-btn'>
									Editar
								</button>
								<button onClick={() => onDelete(transaction.id)} className='delete-btn'>
									Eliminar
								</button>
							</div>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default TransactionList;
