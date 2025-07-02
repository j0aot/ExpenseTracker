import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

const ProfilePage = () => {
	const navigate = useNavigate();

	// Estado para armazenar os dados do perfil
	const [user, setUser] = useState({
		name: 'João Silva',
		email: 'joao.silva@example.com',
		joinedDate: '2023-01-01',
	});

	// Estado para controlar o formulário de edição
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({
		name: user.name,
		email: user.email,
	});

	// Lidar com mudanças no formulário
	const handleChange = e => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	// Salvar as alterações
	const handleSave = () => {
		setUser({
			...user,
			name: formData.name,
			email: formData.email,
		});
		setIsEditing(false);
	};

	// Cancelar a edição
	const handleCancel = () => {
		setFormData({
			name: user.name,
			email: user.email,
		});
		setIsEditing(false);
	};

	return (
		<div className='profile-page'>
			<h2>Meu Perfil</h2>
			<div className='profile-card'>
				{isEditing ? (
					<>
						<div className='form-group'>
							<label>Nome:</label>
							<input type='text' name='name' value={formData.name} onChange={handleChange} />
						</div>
						<div className='form-group'>
							<label>Email:</label>
							<input type='email' name='email' value={formData.email} onChange={handleChange} />
						</div>
						<div className='profile-actions'>
							<button onClick={handleSave} className='save-btn'>
								Salvar
							</button>
							<button onClick={handleCancel} className='cancel-btn'>
								Cancelar
							</button>
						</div>
					</>
				) : (
					<>
						<p>
							<strong>Nome:</strong> {user.name}
						</p>
						<p>
							<strong>Email:</strong> {user.email}
						</p>
						<p>
							<strong>Data de Registro:</strong> {new Date(user.joinedDate).toLocaleDateString('pt-PT')}
						</p>
						<div className='profile-actions'>
							<button onClick={() => setIsEditing(true)} className='edit-btn'>
								Editar
							</button>
							<button onClick={() => navigate(-1)} className='back-btn'>
								Voltar
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default ProfilePage;
