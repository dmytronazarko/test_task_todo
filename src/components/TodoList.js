import React, { Component } from 'react'
import Todo from './Todo'
import axios from 'axios'
import { apiPrefix } from '../../server/config'

class TodoList extends Component {
	constructor(props) {
		super(props)

		let todos
		if (__isBrowser__) {
			todos = window.__INITIAL_DATA__
			delete window.__INITIAL_DATA__
		} else {
			todos = this.props.staticContext.data
		}

		this.state = {
			todos,
			loading: todos ? false : true,
		}

		this.fetchRepos = this.fetchRepos.bind(this)
		this.toggleTodo = this.toggleTodo.bind(this)
	}

	componentDidMount() {
		if (!this.state.todos) {
			this.fetchRepos(this.props.match.params.id)
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.match.params.id !== this.props.match.params.id) {
			this.fetchRepos(this.props.match.params.id)
		}
	}

	fetchRepos(lang) {
		this.setState(() => ({
			loading: true
		}))

		this.props.fetchInitialData(lang)
			.then((todos) => this.setState(() => ({
				todos,
				loading: false,
			})))
	}

	toggleTodo(id) {
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

	render() {
		const { loading, todos } = this.state

		if (loading === true) {
			return <p>LOADING...</p>
		}

		return (
			<ul className="todo-list">
				{todos.map(todo =>
					<Todo
						key={todo.id}
						{...todo}
						onClick={() => this.toggleTodo(todo.id)}
					/>
				)}
			</ul>
		)
	}
}

export default TodoList
