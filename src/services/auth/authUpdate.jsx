import axios from '../axios'

export const updateUser = async (id, firstname, lastname, age, email, password, avatar) => {
	try {
    let authData = {id, firstname, lastname, email, password, age, avatar }
		let url = `/users/${id}`
		const response = await axios.patch(url, authData)
		return response.data
	} catch (error) {
		throw error.response.data
	}
}
