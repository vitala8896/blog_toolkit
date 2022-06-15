import axios from '../axios'
import { authLogout } from '../../store/authSlice'

export const login = async (email, password) => {
	try {
		let authData = { email, password }
		let url = '/login'
		const response = await axios.post(url, authData)
		return response.data
	} catch (error) {
		throw error.response.data
	}
}
export const logout = () => {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('user')
  return authLogout()
}

