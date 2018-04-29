import { serverPort } from './config';
import * as db from './db';
import express from 'express';
import bodyParser from 'body-parser';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App';

db.setUpConnection();

const app = express();
app.use(bodyParser.json());
app.use(express.static('./build'));

app.get('/', (req, res) => {
	res.send(`
		<!DOCTYPE html>
			<head>
				<title>Kickass TODO App</title>
				<link rel='stylesheet' href='/css/main.css'>
				<script src='/bundle.js' defer></script>
			</head>
			<body>
				<div id='root'>${renderToString(<App />)}</div>
			</body>
		</html>
	`);
});

app.get('/api/todos', (req, res) => {
	db.getTodos().then(data =>
		res.json(data)
	);
});

app.post('/api/todos', (req, res) => {
	db.createTodo(req.body).then(data =>
		res.json(data)
	);
});

app.delete('/api/todos', (req, res) => {
	db.deleteTodos(req.body).then(data =>
		res.status(204).json(data)
	);
});

app.listen(serverPort, () => {
	console.log(`Server is listening on port ${serverPort}`);
});
