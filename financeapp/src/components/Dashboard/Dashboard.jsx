import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import './Dashboard.css';

const Dashboard = () => {
	const { getBalance, getCategoriesSummary } = useFinance();
	const balance = getBalance();
	const categories = getCategoriesSummary();

	return (
		<div className='dashboard'>
			<h2>Resumo Financeiro</h2>

			<div className='summary-cards'>
				<div className={`card balance ${balance >= 0 ? 'positive' : 'negative'}`}>
					<h3>Saldo Atual</h3>
					<p>
						{balance >= 0 ? '+' : ''}
						{balance.toFixed(2)}€
					</p>
				</div>
			</div>

			{categories.length > 0 && (
				<div className='categories-section'>
					<h3>Gastos por Categoria</h3>
					<div className='categories-list'>
						{categories.map((category, index) => (
							<div key={index} className='category-item'>
								<span className='category-name'>{category.name}</span>
								<span className='category-amount'>-{category.amount.toFixed(2)}€</span>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
