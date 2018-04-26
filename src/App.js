import React, { Component } from 'react'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
import Footer from './components/Footer'

class App extends Component {
	constructor(props) {
		super(props);

		this.textInput = null;

		this.state = {
			counter: 0,
			todos: [],
			visibile: 'SHOW_ALL'
		}
	}

	onSubmit = (e) => {
		e.preventDefault()

		const text = this.textInput.value
		if (!text.trim()) {
			return
		}

		this.setState(prevState => ({
			todos: [...prevState.todos, {
				id: this.state.counter++,
				text: text,
				completed: false
			}]
		}))

		this.textInput.value = ''
	}

	toggleTodo = (id) => {
		this.setState(prevState => ({
			todos: prevState.todos.map(todo =>
				(todo.id === id)
					? { ...todo, completed: !todo.completed }
					: todo
			)
		}))
	}

	toggleLink = (btnType) => {
		this.setState({
			visibile: btnType
		})
	}

	filterTodos = (todos) => {
		switch (this.state.visibile) {
			case 'SHOW_ACTIVE':
				return todos.slice().filter(todo => !todo.completed)
				break;
			case 'SHOW_COMPLETED':
				return todos.slice().filter(todo => todo.completed)
				break;
			default:
				return todos
		}
	}

	render() {
		return (
			<div className="app">
				<AddTodo onSubmit={this.onSubmit} inputRef={element => this.textInput = element} />
				<TodoList todos={this.filterTodos(this.state.todos)} toggleTodo={this.toggleTodo} />
				{this.state.todos.length ?
					<Footer toggleLink={this.toggleLink} visible={this.state.visibile}/>
					: null}
			</div>
		)
	}
}

export default App
