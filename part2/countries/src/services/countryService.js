import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries'


const getAll = () => {
  const request = axios.get(`${baseUrl}/api/all`)
  return request.then(response => response.data)
}

const getCountry = ( countryName ) => {
	const request = axios.get(`${baseUrl}/api/name/${countryName}`)
	return request.then(response => response.data)
}

// const create = newObject => {
// 	const request = axios.post(baseUrl, newObject)
// 	return request.then(response => response.data)
// }

// const update = (id, newObject) => {
// 	const request = axios.put(`${baseUrl}/${id}`, newObject)
// 	return request.then(response => response.data)
// }

// const deleteContact = (id) => {
// 	const request = axios.delete(`${baseUrl}/${id}`)
// 	return request.then(response => response.data)
// }

export default { getAll, getCountry }