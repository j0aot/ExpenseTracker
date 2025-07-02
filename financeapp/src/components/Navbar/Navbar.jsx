import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
	return (
		<nav className='navbar'>
			<div className='navbar-container'>
				<h1 className='logo'>Finanças Pessoais</h1>
				<div className='navbar-links'>
					<Link to='/'>Início</Link>
					<Link to='/profile'> Perfil</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
