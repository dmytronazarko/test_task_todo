import React, { Component } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import axios from 'axios'
import { apiPrefix } from '../../server/config'
import qs from 'qs'

import routes from '../routes'
import AddTodo from './AddTodo'
import TodoList from './TodoList'
import Footer from './Footer'

class App extends Component {
	constructor(props) {
		super(props);

		this.textInput = null;
		this.todoList = null;

		this.onSubmit = this.onSubmit.bind(this)
		this.clearCompleted = this.clearCompleted.bind(this)
	}

	onSubmit(e) {
		e.preventDefault()

		const text = this.textInput.value;
		if (!text.trim()) {
			return
		}

		axios.post(`${apiPrefix}/todos`, {
			text: text,
			completed: false
		}).then(res => {
			const { id, text, completed } = res.data;
			this.todoList.setState(prevState => ({
				todos: [...prevState.todos, {
					id, text, completed
				}]
			}))
		}).catch(error => {
			console.log(error);
		});

		this.textInput.value = ''
	}

	clearCompleted() {
		const ids = this.todoList.state.todos.slice()
			.filter(todo => todo.completed)
			.map(todo => todo.id);

		axios.delete(`${apiPrefix}/todos`, {
				params: { ids },
				paramsSerializer: function (params) {
					return qs.stringify(params, { arrayFormat: 'repeat' })
				},
			})
			.then(res => {
				this.todoList.setState(prevState => ({
					todos: prevState.todos.filter(todo =>
						!todo.completed
					)
				}))
			}).catch(error => {
				console.log(error);
			}
		);
	}

	render() {
		return (
			<div className="app">
				<AddTodo onSubmit={this.onSubmit} inputRef={element => this.textInput = element} />

				<Switch>
					<Route exact path="/" render={() => (<Redirect to="/all" />)} />
					{routes.map(({ path, exact, ...rest }) => (
						<Route key={path} path={path} exact={exact} render={(props) => (
							<TodoList ref={todoList => { this.todoList = todoList }} {...props} {...rest} />
						)} />
					))}
				</Switch>

				<Footer clearCompleted={this.clearCompleted} active={true} />
			</div>
		)
	}
}

export default App
