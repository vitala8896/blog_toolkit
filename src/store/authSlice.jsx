import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { loginUser as makeLogin } from '../services/auth/authLogin'
import { registerUser as makeRegister } from '../services/auth/authRegister'
import { updateUser as makeUpdate } from '../services/auth/authUpdate'
import { setToken, getToken } from '../services/tokenService'
import { setLocalUser, getLocalUser } from '../services/userService'

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		errors: [],
		accessToken: getToken(),
		idLoading: false,
		isAuthenticated: !!getToken()?.length,
		user: getLocalUser(),
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
			setLocalUser(payload.user)
			// console.log('payload => ', payload)
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
			setLocalUser(payload.user)
			console.log('payload => ', payload)
		})
		builder.addCase(updateUser.pending, (state) => {
			state.idLoading = true
			state.errors = []
		})
		builder.addCase(updateUser.rejected, (state, payload) => {
			state.idLoading = false
			state.errors.push(payload.error.message)
		})
		builder.addCase(updateUser.fulfilled, (state, { payload, f }) => {
			state.idLoading = false
			state.errors = []
			state.isAuthenticated = true
			// console.log('payload => ', payload)
		})
	},
})

export const updateUser = createAsyncThunk('auth/update', async (data, api) => {
	// console.log('data => ', data)
	const { id, firstname, lastname, age, email, password, avatar } = data
	const response = await makeUpdate(id, firstname, lastname, age, email, password, avatar)
	return response
})
export const loginUser = createAsyncThunk('auth/login', async (data, api) => {
	// console.log('data => ', data)
	const { email, password } = data
	const response = await makeLogin(email, password)
	return response
})
export const registerUser = createAsyncThunk('auth/register', async (data, api) => {
	// console.log('data => ', data)
	const { firstname, lastname, age, email, password, avatar } = data
	const response = await makeRegister(firstname, lastname, age, email, password, avatar)	
	return response
})

export const { authLogout } = authSlice.actions

export default authSlice.reducer
