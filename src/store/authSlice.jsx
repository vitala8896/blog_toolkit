import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginUser as makeLogin } from '../services/auth/authLogin'
import { registerUser as makeRegister } from '../services/auth/authRegister'
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
		builder.addCase(loginUser.pending, (state) => {
			state.idLoading = true
			state.errors = []
		})
		builder.addCase(loginUser.rejected, (state, payload) => {
			state.idLoading = false
			state.errors.push(payload.error.message)
		})
		builder.addCase(loginUser.fulfilled, (state, { payload, f }) => {
			state.idLoading = false
			state.errors = []
			state.accessToken = payload.accessToken
			state.user = payload.user
			state.isAuthenticated = true
			setToken(payload.accessToken)
			setUser(payload.user)
			console.log('payload => ', payload)
		})
		builder.addCase(registerUser.pending, (state) => {
			state.idLoading = true
			state.errors = []
		})
		builder.addCase(registerUser.rejected, (state, payload) => {
			state.idLoading = false
			state.errors.push(payload.error.message)
		})
		builder.addCase(registerUser.fulfilled, (state, { payload, f }) => {
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
export const loginUser = createAsyncThunk('auth/login', async (data, api) => {
	console.log('data => ', data)
	const { email, password } = data
	const response = await makeLogin(email, password)	
	return response
})
export const registerUser = createAsyncThunk('auth/register', async (data, api) => {
	console.log('data => ', data)
	const { firstname, lastname, age, email, password, avatar } = data
	const response = await makeRegister(firstname, lastname, age, email, password, avatar)	
	return response
})

export const { authLogout } = authSlice.actions

export default authSlice.reducer
