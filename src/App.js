import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
import Footer from './components/Footer'
import { apiPrefix } from '../api/config'
import axios from 'axios'
import qs from 'qs'

class App extends Component {
	constructor(props) {
		super(props);
		this.textInput = null;

		let initialData;
		if (props.staticContext) {
			initialData = props.staticContext.initialData
		} else {
			initialData = typeof window !== "undefined" && window && window.__initialData__;
			initialData && delete window.__initialData__;
		}

		this.state = {
			todos: initialData || [],
			show: 'SHOW_ALL'
		}
	}

	// componentDidMount() {
	// 	axios.get(`${apiPrefix}/todos`).then(res => {
	// 		const { id, text, completed } = res.data;
	// 		this.setState(prevState => ({
	// 			todos: [...prevState.todos, {
	// 				id, text, completed
	// 			}]
	// 		}))
	// 	}).catch(error => {
	// 		console.log(error);
	// 	});
	// }

	onSubmit = (e) => {
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
			this.setState(prevState => ({
				todos: [...prevState.todos, {
					id, text, completed
				}]
			}))
		}).catch(error => {
			console.log(error);
		});

		this.textInput.value = ''
	}

	toggleTodo = (id) => {
		axios.post(`${apiPrefix}/todos/${id}`)
			.then(res => {
				this.setState(prevState => ({
					todos: prevState.todos.map(todo =>
						(todo.id === id)
							? { ...todo, completed: !todo.completed }
							: todo
					)
				}))
			}).catch(error => {
				console.log(error);
			});
	}

	clearCompleted = () => {
		const ids = this.state.todos.slice()
			.filter(todo => todo.completed)
			.map(todo => todo.id);

		axios.delete(`${apiPrefix}/todos`, {
			params: { ids },
			paramsSerializer: function (params) {
				return qs.stringify(params, { arrayFormat: 'repeat' })
			},
		})
		.then(res => {
			this.setState(prevState => ({
				todos: prevState.todos.filter(todo =>
					!todo.completed
				)
			}))
		}).catch(error => {
			console.log(error);
		});
	}

	render() {
		return (
			<div className="app">
				<AddTodo onSubmit={this.onSubmit} inputRef={element => this.textInput = element} />
				<Switch>
					<Route exact path="/">
						<TodoList todos={this.state.todos} toggleTodo={this.toggleTodo} />
					</Route>
					<Route path="/active">
						<TodoList todos={this.state.todos.slice().filter(todo => !todo.completed)} toggleTodo={this.toggleTodo} />
					</Route>
					<Route path="/completed">
						<TodoList todos={this.state.todos.slice().filter(todo => todo.completed)} toggleTodo={this.toggleTodo} />
					</Route>
				</Switch>
				{!!this.state.todos.length &&
					<Footer toggleLink={this.toggleLink} clearCompleted={this.clearCompleted} show={this.state.show} />
				}
			</div>
		)
	}
}

export default App
