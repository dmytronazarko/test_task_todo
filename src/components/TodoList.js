import React from 'react'
import Todo from './Todo'

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

export default TodoList
