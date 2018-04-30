import { serverPort } from './config';
import serialize from 'serialize-javascript';
import * as db from './db';
import express from 'express';
import bodyParser from 'body-parser';
import React from 'react';
import { renderToString, matchPath } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from '../src/App';
import sourceMapSupport from "source-map-support";

if (process.env.NODE_ENV === "development") {
	sourceMapSupport.install();
}


db.setUpConnection();

const app = express();
app.use(bodyParser.json());
app.use(express.static('./build'));

app.get('/', (req, res, next) => {
	// Promise.resolve(
	db.getTodos().then(data => {
		const context = { data };
		const markup = renderToString(
			<StaticRouter location={req.url} context={context}>
				<App />
			</StaticRouter>
		)

		res.send(`
			<!DOCTYPE html>
				<head>
					<title>Kickass TODO App</title>
					<link rel='stylesheet' href='/css/main.css'>
					<script src='/bundle.js' defer></script>
					<script>window.__initialData__ = ${serialize(data)}</script>
				</head>
				<body>
					<div id='root'>${markup}</div>
				</body>
			</html>
		`)
	})
		// )
		.catch(next);
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

app.post('/api/todos/:id', (req, res) => {
	db.updateTodo(req.params.id).then(data =>
		res.json(data)
	);
});

app.delete('/api/todos', (req, res) => {
	db.deleteTodos(req.query).then(data =>
		res.send({success: true})
	);
});

app.listen(serverPort, () => {
	console.log(`Server is listening on port ${serverPort}`);
});
