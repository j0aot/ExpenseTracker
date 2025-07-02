import React, { useState } from 'react';
import './TransactionList.css';

const TransactionList = ({ transactions, editTransaction, removeTransaction }) => {
	const [editingId, setEditingId] = useState(null);
	const [editForm, setEditForm] = useState({
		description: '',
		amount: '',
		category: '',
		date: '',
	});

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
		editTransaction(id, {
			...editForm,
			id,
			type: 'expense', // Garantir que o tipo permaneça como 'expense'
		});
		setEditingId(null);
	};

	return (
		<div className='transaction-list'>
			<h2>Transações</h2>
			{transactions.length === 0 ? (
				<p className='no-transactions'>Nenhuma transação encontrada.</p>
			) : (
				<ul className='transactions'>
					{transactions.map(transaction => (
						<li key={transaction.id} className={`transaction ${transaction.type}`}>
							{editingId === transaction.id ? (
								<div className='edit-form'>
									<input type='text' name='description' value={editForm.description} onChange={handleEditChange} />
									<input type='number' name='amount' value={editForm.amount} onChange={handleEditChange} min='0.01' step='0.01' />
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
										<span className={`amount ${transaction.type}`}>-{parseFloat(transaction.amount).toFixed(2)}€</span>
									</div>
									<div className='transaction-actions'>
										<button onClick={() => handleEditClick(transaction)} className='edit-btn'>
											Editar
										</button>
										<button onClick={() => removeTransaction(transaction.id)} className='delete-btn'>
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
