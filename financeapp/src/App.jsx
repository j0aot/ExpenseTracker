import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import './index.css';

const App = () => {
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		if (darkMode) {
			document.body.classList.add('dark-mode');
		} else {
			document.body.classList.remove('dark-mode');
		}
	}, [darkMode]);

	return (
		<Router>
			<div style={{ textAlign: 'right', padding: '10px 20px' }}>
				<button onClick={() => setDarkMode(prev => !prev)} className='darkmode-btn'>
					{darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
				</button>
			</div>
			<Routes>
				<Route path='/login' element={<LoginPage />} />
				<Route path='/' element={<Home />} />
				<Route path='/profile' element={<ProfilePage />} />
			</Routes>
		</Router>
	);
};

export default App;
