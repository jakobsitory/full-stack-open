import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'


const getAll = () => {
	const request = axios.get(baseUrl)
	return request
	.then(response => response.data)
	.catch(error => { errorHandler(error) })
}

const create = newObject => {
	const request = axios.post(baseUrl, newObject)
	return request
	.then(response => response.data)
	.catch(error => { errorHandler(error)})
}

const update = (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject)
	return request
	.then(response => response.data)
	.catch(error => { errorHandler(error)})
}

const deleteContact = (id) => {
	const request = axios.delete(`${baseUrl}/${id}`)
	return request
	.then(response => response.data)
	.catch(error => { errorHandler(error)})
}

const errorHandler = (error) => {
	console.log(error.response.data.error)
	const customError = new Error(error.response.data.error || error.message)
	throw customError
}

export default { getAll, create, update, deleteContact }