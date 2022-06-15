import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login as makeLogin } from '../services/auth/authLogin'
import { register as makeRegister } from '../services/auth/authRegister'
import { setToken, getToken } from '../services/tokenService'
import { setUser, getUser } from '../services/userService'

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		errors: [],
		accessToken: getToken(),
		idLoading: false,
		isAuthenticated: !!getToken()?.length,
		user: getUser(),
	},
	reducers: {
		authLogout: state => {
			state.accessToken = null
			state.isAuthenticated = false
    }
	},
	extraReducers(builder) {
		builder.addCase(login.pending, (state) => {
			state.idLoading = true
			state.errors = []
		})
		builder.addCase(login.rejected, (state, payload) => {
			state.idLoading = false
			state.errors.push(payload.error.message)
		})
		builder.addCase(login.fulfilled, (state, { payload, f }) => {
			state.idLoading = false
			state.errors = []
			state.accessToken = payload.accessToken
			state.user = payload.user
			state.isAuthenticated = true
			setToken(payload.accessToken)
			setUser(payload.user)
			console.log('payload => ', payload)
		})
		builder.addCase(register.pending, (state) => {
			state.idLoading = true
			state.errors = []
		})
		builder.addCase(register.rejected, (state, payload) => {
			state.idLoading = false
			state.errors.push(payload.error.message)
		})
		builder.addCase(register.fulfilled, (state, { payload, f }) => {
			state.idLoading = false
			state.errors = []
			state.accessToken = payload.accessToken
			state.user = payload.user
			state.isAuthenticated = true
			setToken(payload.accessToken)
			setUser(payload.user)
			console.log('payload => ', payload)
		})
	},
})
export const login = createAsyncThunk('auth/login', async (data, api) => {
	console.log('data => ', data)
	const { email, password } = data
	const response = await makeLogin(email, password)	
	return response
})
export const register = createAsyncThunk('auth/register', async (data, api) => {
	console.log('data => ', data)
	const { email, password, firstname, lastname, age, avatar } = data
	const response = await makeRegister(email, password, firstname, lastname, age, avatar)	
	return response
})

export const { authLogout } = authSlice.actions

export default authSlice.reducer
