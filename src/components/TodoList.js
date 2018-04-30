import React from 'react'
import Todo from './Todo'
import PropTypes from 'prop-types'

const TodoList = ({ todos, toggleTodo }) => (
	<ul className="todo-list">
		{todos.map(todo =>
			<Todo
				key={todo.id}
				{...todo}
				onClick={() => toggleTodo(todo.id)}
			/>
		)}
	</ul>
)

TodoList.propTypes = {
	todos: PropTypes.arrayOf(PropTypes.shape({
		id: PropTypes.string.isRequired,
		completed: PropTypes.bool.isRequired,
		text: PropTypes.string.isRequired
	  }).isRequired).isRequired,
	toggleTodo: PropTypes.func.isRequired
}

export default TodoList
