import { useAuth } from '@clerk/clerk-react';

export function useTransactionsApi() {
	const { getToken } = useAuth();

	const fetchTransactions = async () => {
		const token = await getToken();
		const res = await fetch('/api/transactions', {
			headers: { Authorization: `Bearer ${token}` },
		});
		return res.json();
	};

	const addTransaction = async data => {
		const token = await getToken();
		const res = await fetch('/api/transactions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		});
		return res.json();
	};

	const editTransaction = async (id, data) => {
		const token = await getToken();
		const res = await fetch(`/api/transactions/${id}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(data),
		});
		return res.json();
	};

	const removeTransaction = async id => {
		const token = await getToken();
		const res = await fetch(`/api/transactions/${id}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${token}` },
		});
		return res.json();
	};

	return { fetchTransactions, addTransaction, editTransaction, removeTransaction };
}
