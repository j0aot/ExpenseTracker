import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
	const { login } = useAuth();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [error, setError] = useState('');

	const handleChange = e => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		setError('');

		// Simulação de autenticação - será substituído por Clerk posteriormente
		if (formData.email && formData.password) {
			login({
				email: formData.email,
				name: 'Usuário Demo', // Nome fictício para a demonstração
			});
			navigate('/');
		} else {
			setError('Por favor, preencha todos os campos');
		}
	};

	return (
		<div className='login-container'>
			<div className='login-card'>
				<h2>Login</h2>
				{error && <p className='error-message'>{error}</p>}

				<form onSubmit={handleSubmit}>
					<div className='form-group'>
						<label>Email</label>
						<input type='email' name='email' value={formData.email} onChange={handleChange} required />
					</div>

					<div className='form-group'>
						<label>Senha</label>
						<input type='password' name='password' value={formData.password} onChange={handleChange} required />
					</div>

					<button type='submit' className='login-btn'>
						Entrar
					</button>
				</form>

				<p className='demo-note'>Para esta demonstração, qualquer email e senha válidos funcionarão. Posteriormente será integrado com Clerk para autenticação real.</p>
			</div>
		</div>
	);
};

export default Login;
