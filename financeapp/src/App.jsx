import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import './index.css';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';

// Toast component
function Toast({ message, onClose }) {
	if (!message) return null;
	return (
		<div
			style={{
				position: 'fixed',
				top: 20,
				right: 20,
				background: '#333',
				color: '#fff',
				padding: '16px 24px',
				borderRadius: 8,
				boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
				zIndex: 9999,
				fontWeight: 'bold',
			}}
		>
			{message}
			<button
				onClick={onClose}
				style={{
					marginLeft: 16,
					background: 'transparent',
					border: 'none',
					color: '#fff',
					cursor: 'pointer',
					fontSize: 18,
				}}
			>
				×
			</button>
		</div>
	);
}

const App = () => {
	const [darkMode, setDarkMode] = useState(false);
	const [toast, setToast] = useState('');

	const showToast = msg => {
		setToast(msg);
		setTimeout(() => setToast(''), 2500);
	};

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
			<Toast message={toast} onClose={() => setToast('')} />
			<Routes>
				<Route
					path='/'
					element={
						<>
							<SignedIn>
								<Home showToast={showToast} />
							</SignedIn>
							<SignedOut>
								<RedirectToSignIn />
							</SignedOut>
						</>
					}
				/>
				<Route path='/login' element={<LoginPage />} />
				<Route
					path='/profile'
					element={
						<>
							<SignedIn>
								<ProfilePage />
							</SignedIn>
							<SignedOut>
								<RedirectToSignIn />
							</SignedOut>
						</>
					}
				/>
			</Routes>
		</Router>
	);
};

export default App;
