import { useAuth } from '@clerk/clerk-react';

export function useTransactionsApi() {
	const { getToken } = useAuth();

	const fetchTransactions = async () => {
		const token = await getToken();
		const res = await fetch('/api/transactions', {
			headers: { Authorization: `Bearer ${token}` },
		});
		const contentType = res.headers.get('content-type');
		if (!res.ok) {
			const text = await res.text();
			throw new Error(text);
		}
		if (contentType && contentType.includes('application/json')) {
			return res.json();
		} else {
			const text = await res.text();
			throw new Error('Resposta inesperada da API: ' + text);
		}
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
		const contentType = res.headers.get('content-type');
		if (!res.ok) {
			const text = await res.text();
			throw new Error(text);
		}
		if (contentType && contentType.includes('application/json')) {
			return res.json();
		} else {
			const text = await res.text();
			throw new Error('Resposta inesperada da API: ' + text);
		}
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
		const contentType = res.headers.get('content-type');
		if (!res.ok) {
			const text = await res.text();
			throw new Error(text);
		}
		if (contentType && contentType.includes('application/json')) {
			return res.json();
		} else {
			const text = await res.text();
			throw new Error('Resposta inesperada da API: ' + text);
		}
	};

	const removeTransaction = async id => {
		const token = await getToken();
		const res = await fetch(`/api/transactions/${id}`, {
			method: 'DELETE',
			headers: { Authorization: `Bearer ${token}` },
		});
		const contentType = res.headers.get('content-type');
		if (!res.ok) {
			const text = await res.text();
			throw new Error(text);
		}
		if (contentType && contentType.includes('application/json')) {
			return res.json();
		} else {
			const text = await res.text();
			throw new Error('Resposta inesperada da API: ' + text);
		}
	};

	return { fetchTransactions, addTransaction, editTransaction, removeTransaction };
}
