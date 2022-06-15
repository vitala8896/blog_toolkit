import axios from '../axios'

export const register = async (email, password, firstname, lastname, age, avatar) => {
	try {
		let authData = { email, password, firstname, lastname, age, avatar }
		let url = '/register'
		const response = await axios.post(url, authData)
		return response.data
	} catch (error) {
		throw error.response.data
	}
}

