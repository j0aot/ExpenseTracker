import express from 'express';
import Transaction from '../models/Transaction.js';

const router = express.Router();

// Buscar todas as transações do usuário autenticado
router.get('/', async (req, res) => {
	try {
		const userId = req.auth.userId;
		const transactions = await Transaction.find({ userId });
		res.json(transactions);
	} catch (err) {
		res.status(500).json({ error: 'Erro ao buscar transações.' });
	}
});

// Criar uma nova transação para o usuário autenticado
router.post('/', async (req, res) => {
	try {
		const userId = req.auth.userId;
		const { type, description, amount, category, date } = req.body;
		const transaction = new Transaction({ userId, type, description, amount, category, date });
		await transaction.save();
		res.status(201).json(transaction);
	} catch (err) {
		res.status(500).json({ error: 'Erro ao criar transação.' });
	}
});

// Atualizar uma transação do usuário autenticado
router.put('/:id', async (req, res) => {
	try {
		const userId = req.auth.userId;
		const { id } = req.params;
		const { type, description, amount, category, date } = req.body;
		const transaction = await Transaction.findOneAndUpdate({ _id: id, userId }, { type, description, amount, category, date }, { new: true });
		if (!transaction) return res.status(404).json({ error: 'Not found' });
		res.json(transaction);
	} catch (err) {
		res.status(500).json({ error: 'Erro ao atualizar transação.' });
	}
});

// Remover uma transação do usuário autenticado
router.delete('/:id', async (req, res) => {
	try {
		const userId = req.auth.userId;
		const { id } = req.params;
		const transaction = await Transaction.findOneAndDelete({ _id: id, userId });
		if (!transaction) return res.status(404).json({ error: 'Not found' });
		res.json({ success: true });
	} catch (err) {
		res.status(500).json({ error: 'Erro ao apagar transação.' });
	}
});

export default router;
