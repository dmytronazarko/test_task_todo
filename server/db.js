import mongoose from 'mongoose'
import { db } from './config'

const TodoSchema = mongoose.Schema({
	id: mongoose.Schema.Types.ObjectId,
	text: String,
	completed: Boolean
})

const Todo = mongoose.model('Todo', TodoSchema);

export function setUpConnection() {
	mongoose.connect(`mongodb://${db.host}:${db.port}/${db.name}`)
}

export function getTodos() {
	return Todo.find();
}

export function createTodo({ text, completed }) {
	return new Todo({
		id: new mongoose.Types.ObjectId(),
		text,
		completed
	}).save();
}

export function updateTodo(id, completed) {
	return Todo.findOne({ id }).then(data => {
		return Todo.findOneAndUpdate({ id }, { completed: !data.completed }, { new: true })
	})
}

export function deleteTodos({ ids }) {
	return Todo.find({ id: { $in: ids } }).remove();
}
