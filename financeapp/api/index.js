import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';
import transactionsRouter from './routes/transactions.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
mongoose
	.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('MongoDB connected'))
	.catch(err => console.error(err));

// Middleware de autenticação e rotas
app.use('/transactions', ClerkExpressRequireAuth(), transactionsRouter);

// Rota raiz para teste
app.get('/', (req, res) => {
	res.send('API FinanceApp');
});

// Handler para Vercel Serverless Function
export default function handler(req, res) {
	return app(req, res);
}
