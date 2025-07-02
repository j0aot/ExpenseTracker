import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import './ProfilePage.css';

const ProfilePage = () => {
	const navigate = useNavigate();
	const { user, isLoaded } = useUser();

	// Estado para controlar o formulário de edição
	const [isEditing, setIsEditing] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
	});

	React.useEffect(() => {
		if (user) {
			setFormData({
				name: user.fullName || '',
				email: user.primaryEmailAddress?.emailAddress || '',
			});
		}
	}, [user]);

	const handleChange = e => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSave = async () => {
		if (user) {
			await user.update({
				fullName: formData.name,
			});
			if (formData.email !== user.primaryEmailAddress?.emailAddress) {
				await user.createEmailAddress({ email: formData.email });
				// Opcional: pode pedir verificação do novo email
			}
		}
		setIsEditing(false);
	};

	const handleCancel = () => {
		if (user) {
			setFormData({
				name: user.fullName || '',
				email: user.primaryEmailAddress?.emailAddress || '',
			});
		}
		setIsEditing(false);
	};

	if (!isLoaded) {
		return <div>Carregando perfil...</div>;
	}

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
							<strong>Nome:</strong> {user.fullName}
						</p>
						<p>
							<strong>Email:</strong> {user.primaryEmailAddress?.emailAddress}
						</p>
						<p>
							<strong>ID:</strong> {user.id}
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
