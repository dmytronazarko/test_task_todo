import React from 'react'

const AddTodo = ({ onSubmit, inputRef }) => {
	return (
		<div className="add-todo">
			<form onSubmit={onSubmit}>
				<input ref={inputRef} placeholder="add todo" />
			</form>
		</div>
	)
}

export default AddTodo
