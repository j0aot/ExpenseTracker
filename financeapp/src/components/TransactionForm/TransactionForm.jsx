import React, { useState } from 'react';
import './TransactionForm.css';

const TransactionForm = ({ addTransaction }) => {
	const [formData, setFormData] = useState({
		type: 'expense',
		description: '',
		amount: '',
		category: 'alimentacao',
		date: new Date().toISOString().split('T')[0],
	});

	const categories = {
		expense: ['alimentacao', 'combustivel', 'renda', 'lazer', 'saude', 'transporte', 'outros'],
		income: ['salario', 'freelance', 'investimentos', 'presente', 'outros'],
	};

	const handleChange = e => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		addTransaction(formData); // Não adicionar id manualmente!
		setFormData({
			type: 'expense',
			description: '',
			amount: '',
			category: 'alimentacao',
			date: new Date().toISOString().split('T')[0],
		});
	};

	return (
		<div className='transaction-form'>
			<h2>Adicionar Transação</h2>
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label>Tipo</label>
					<div className='radio-group'>
						<label>
							<input type='radio' name='type' value='expense' checked={formData.type === 'expense'} onChange={handleChange} />
							Despesa
						</label>
						<label>
							<input type='radio' name='type' value='income' checked={formData.type === 'income'} onChange={handleChange} />
							Receita
						</label>
					</div>
				</div>

				<div className='form-group'>
					<label>Descrição</label>
					<input type='text' name='description' value={formData.description} onChange={handleChange} required />
				</div>

				<div className='form-group'>
					<label>Valor (€)</label>
					<input type='number' name='amount' value={formData.amount} onChange={handleChange} min='1' step='1' required />
				</div>

				<div className='form-group'>
					<label>Categoria</label>
					<select name='category' value={formData.category} onChange={handleChange} required>
						{categories[formData.type].map(category => (
							<option key={category} value={category}>
								{category.charAt(0).toUpperCase() + category.slice(1)}
							</option>
						))}
					</select>
				</div>

				<div className='form-group'>
					<label>Data</label>
					<input type='date' name='date' value={formData.date} onChange={handleChange} required />
				</div>

				<button type='submit' className='submit-btn'>
					Adicionar Transação
				</button>
			</form>
		</div>
	);
};

export default TransactionForm;
