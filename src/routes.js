import TodoList from './components/TodoList'
import fetch from 'isomorphic-fetch'
import { apiPrefix } from '../server/config'

const fetchAllTodos = () => (
	fetch(`${apiPrefix}/todos`).then(data => data.json())
)

const routes = [
	{
		path: '/:show',
		component: TodoList,
		fetchInitialData: () => fetchAllTodos()
	}
]

export default routes
