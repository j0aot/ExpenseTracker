import React from 'react';
import { SignIn } from '@clerk/clerk-react';

const LoginPage = () => {
	return (
		<div className='login-page'>
			<SignIn />
		</div>
	);
};

export default LoginPage;
