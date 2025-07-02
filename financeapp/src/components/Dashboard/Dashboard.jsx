import React from 'react';
import './Dashboard.css';

const Dashboard = ({ balance }) => {
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
		</div>
	);
};

export default Dashboard;
