import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Dashboard from '../components/Dashboard/Dashboard';
import TransactionForm from '../components/TransactionForm/TransactionForm';
import TransactionList from '../components/TransactionList/TransactionList';

const Home = () => {
	return (
		<div className='app-container'>
			<Navbar />

			<main className='main-content'>
				<div className='content-wrapper'>
					<Dashboard />
					<TransactionForm />
					<TransactionList />
				</div>
			</main>
		</div>
	);
};

export default Home;
