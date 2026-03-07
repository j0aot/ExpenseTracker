import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import transactionsRouter from './routes/transactions.js';

// Carrega o .env correto (api/.env) para desenvolvimento local
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '.env') });

const app = express();

app.use(cors());
app.use(express.json());

// Cache da conexão MongoDB para Vercel Serverless
let isConnected = false;

const connectDB = async () => {
	if (isConnected) return;

	try {
		const db = await mongoose.connect(process.env.MONGODB_URI);
		isConnected = db.connections[0].readyState === 1;
		console.log('MongoDB connected');
	} catch (err) {
		console.error('MongoDB connection error:', err);
		throw err;
	}
};

app.use(async (req, res, next) => {
	try {
		await connectDB();
		next();
	} catch (err) {
		res.status(500).json({ error: 'Database connection failed' });
	}
});

app.use('/api/transactions', ClerkExpressRequireAuth(), transactionsRouter);

app.get('/', (req, res) => {
	res.send('API FinanceApp');
});

export default function handler(req, res) {
	return app(req, res);
}
