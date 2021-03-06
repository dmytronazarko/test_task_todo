import request from 'request';
import { apiPrefix } from '../server/config';
import server from '../server/index';
import qs from 'qs';

describe('TEST API', () => {
	const initialData = {
		text: 'new todo',
		completed: false
	}
	let createdTodo = null;

	describe('CREATE todo', () => {
		const data = {};
		beforeAll((done) => {
			request({
				method: 'POST',
				url: `${apiPrefix}/todos`,
				body: { text: 'new todo', completed: false },
				json: true
			}, (err, resp, body) => {
				if (err) {
					console.error('error creating todo: ', err)
					throw err
				}
				data.status = resp.statusCode;
				data.body = body;
				createdTodo = body;
				done();
			})
		})

		it('Status 201', () => {
			expect(data.status).toBe(201)
		})
		it('Body should return created todo', () => {
			expect(data.body).toEqual(jasmine.objectContaining(initialData))
		})
	})

	describe('READ todo', () => {
		const data = {};
		beforeAll((done) => {
			request.get(`${apiPrefix}/todos`, (err, resp, body) => {
				data.status = resp.statusCode;
				data.body = body;
				done();
			})
		})
		it('Status 200', () => {
			expect(data.status).toBe(200)
		})
		it('Body should contain created item', () => {
			expect(JSON.parse(data.body)).toEqual(jasmine.arrayContaining([createdTodo]))
		})
	})

	describe('UPDATE todo', () => {
		const data = {};
		beforeAll((done) => {
			request.post(`${apiPrefix}/todos/${createdTodo.id}`, (err, resp, body) => {
				data.status = resp.statusCode;
				data.body = body;
				done();
			})
		})
		it('Status 200', () => {
			expect(data.status).toBe(200)
		})
		it('Body should return updated item', () => {
			createdTodo.completed = !createdTodo.completed;
			expect(JSON.parse(data.body)).toEqual(jasmine.objectContaining(createdTodo))
		})
	})

	describe('DELETE todo', () => {
		const data = {};
		beforeAll((done) => {
			const params = qs.stringify({ids: [createdTodo.id]}, { arrayFormat: 'repeat' })
			request.delete(`${apiPrefix}/todos/?${params}`, (err, resp, body) => {
				data.status = resp.statusCode;
				done();
			})
		})
		it('Status 204', () => {
			expect(data.status).toBe(204)
		})
	})
});
