import axios from './../axios'
import { logout } from '../auth/authLogin'

export const getUser = async id => { 
  try {
    let response = await axios.get(`/users/${id}`)      
    return response.status 
  } catch (e) {
    logout() 
  } 
}