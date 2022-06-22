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
export const chechOnAuth = () => {
  if(localStorage.getItem('user')) {     
    getUser(JSON.parse(localStorage.getItem('user')).id)
  }
}
