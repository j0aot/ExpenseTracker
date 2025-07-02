const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');
require('dotenv').config();

const transactionsRouter = require('./routes/transactions');
const authMiddleware = require('./middleware/auth');

const app = express();

app.use(cors());
app.use(express.json());
app.use(ClerkExpressWithAuth());

mongoose
	.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => console.log('MongoDB connected'))
	.catch(err => console.error(err));

// Rotas protegidas
app.use('/transactions', authMiddleware, transactionsRouter);

app.get('/', (req, res) => {
	res.send('API FinanceApp');
});

module.exports = app;
