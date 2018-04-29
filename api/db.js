import mongoose from 'mongoose'
import { db } from './config.json'

const TodoSchema = mongoose.Schema({
	id: mongoose.Schema.Types.ObjectId,
	text: String,
	completed: Boolean
})

const Todo = mongoose.model('Todo', TodoSchema);

export default Todo;


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

export function deleteTodos({ ids }) {
	return Todo.find({ id: { $in: ids } }).remove();
}
