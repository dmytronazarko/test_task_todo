import React from 'react'
import PropTypes from 'prop-types'

const AddTodo = ({ onSubmit, inputRef }) => {
	return (
		<div className="add-todo">
			<form onSubmit={onSubmit}>
				<input ref={inputRef} placeholder="add todo" />
			</form>
		</div>
	)
}

AddTodo.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	inputRef: PropTypes.func.isRequired
};

export default AddTodo
