import axios from '../axios'

export const registerUser = async (firstname, lastname, age, email, password, avatar) => {
	try {
		let authData = { firstname, lastname, email, password, age, avatar }
		let url = '/register'
		const response = await axios.post(url, authData)
		return response.data
	} catch (error) {
		throw error.response.data
	}
}