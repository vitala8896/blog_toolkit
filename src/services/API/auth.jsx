import axios from '../axios/axios-post'
import { authSuccess } from '../../store/authSlice'


export const authRegister = (email, password, firstname, lastname, age, avatar) => {
  return async dispatch => {
    let authData = { email, password, firstname, lastname, age, avatar }
    let url = '/register'
    const response = await axios.post(url, authData)
    const data = response.data
    const expirationDate = new Date(new Date().getTime() + 100000 * 200)
    localStorage.setItem('token', data.accessToken)
    localStorage.setItem('userId', data.user.id)
    localStorage.setItem('expirationDate', expirationDate)
    dispatch(authSuccess(data.accessToken))
  }
}
export const authLogin = (email, password) => {
  return async dispatch => {
    let authData = { email, password }
    let url = '/login'
    const response = await axios.post(url, authData)
    console.log(response)
    const data = response.data    
    localStorage.setItem('token', data.accessToken)
    localStorage.setItem('userId', data.user.id)
    localStorage.setItem('expirationDate', expirationDate)
    dispatch(authSuccess(data.accessToken))
  }
}