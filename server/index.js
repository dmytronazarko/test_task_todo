import express from "express"
import bodyParser from 'body-parser';
import cors from "cors";
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import serialize from "serialize-javascript";
import { serverPort } from './config';
import * as db from './db';
import App from '../src/components/App';
import routes from '../src/routes';

db.setUpConnection();
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("public"));

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
		res.send({ success: true })
	);
});

app.get("*", (req, res, next) => {
	const activeRoute = routes.find((route) => matchPath(req.url, route)) || {}

	const promise = activeRoute.fetchInitialData
		? activeRoute.fetchInitialData(req.path)
		: Promise.resolve()

	promise.then((data) => {
		const context = { data }

		const markup = renderToString(
			<StaticRouter location={req.url} context={context}>
				<App />
			</StaticRouter>
		)

		res.send(`
			<!DOCTYPE html>
			<html>
				<head>
				<title>Kickass TODO App</title>
				<link rel='stylesheet' href='/css/main.css'>
				<script src="/bundle.js" defer></script>
				<script>window.__INITIAL_DATA__ = ${serialize(data)}</script>
				</head>

				<body>
				<div id="app">${markup}</div>
				</body>
			</html>
    	`)
	}).catch(next)
})

app.listen(serverPort, () => {
	console.log(`Server is listening on port ${serverPort}`);
});
