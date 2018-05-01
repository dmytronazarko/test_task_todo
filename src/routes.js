import TodoList from './components/TodoList'
import fetch from 'isomorphic-fetch'
import { apiPrefix } from '../server/config'

const fetchAllRepos = () => (
	fetch(`${apiPrefix}/todos`).then(data => data.json())
)

const routes = [
	{
		path: '/',
		exact: true,
		component: TodoList,
		fetchInitialData: (() => fetchAllRepos())
	},
	{
		path: '/active',
		component: TodoList,
		fetchInitialData: (() => {
			return fetchAllRepos()
				.then(todos => {
					return new Promise(resolve => resolve(
						todos.filter(todo => !todo.completed)
					))
				})
		})
	},
	{
		path: '/completed',
		component: TodoList,
		fetchInitialData: (() => {
			return fetchAllRepos()
				.then(todos => {
					return new Promise(resolve => resolve(
						todos.filter(todo => todo.completed)
					))
				})
		})
	}
]

export default routes
