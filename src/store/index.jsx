import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import postSlice from './postSlice'
import createSlice from './createSlice'
import userSlice from './userSlice'

export const store = configureStore({
	reducer: {
		auth: authSlice,
		post: postSlice,
		create: createSlice,
		user: userSlice
	},
})
