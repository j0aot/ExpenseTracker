import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
	const { user, logout } = useAuth();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	return (
		<nav className='navbar'>
			<div className='navbar-container'>
				<h1 className='logo'>Finanças Pessoais</h1>

				{user && (
					<div className='user-section'>
						<span className='username'>Olá, {user.name}</span>
						<button onClick={handleLogout} className='logout-btn'>
							Sair
						</button>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
