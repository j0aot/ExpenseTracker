import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { FinanceProvider } from './context/FinanceContext';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import './index.css';

const App = () => {
	const PrivateRoute = ({ children }) => {
		const { user } = useAuth();
		return user ? children : <Navigate to='/login' />;
	};

	return (
		<AuthProvider>
			<FinanceProvider>
				<Router>
					<Routes>
						<Route path='/login' element={<LoginPage />} />
						<Route
							path='/'
							element={
								<PrivateRoute>
									<Home />
								</PrivateRoute>
							}
						/>
					</Routes>
				</Router>
			</FinanceProvider>
		</AuthProvider>
	);
};

export default App;
