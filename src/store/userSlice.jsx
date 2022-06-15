import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: []
  },
  reducers: {  
    setReduxUsers: (state, event) => {
      state.users = event.payload;   
    }
  },
})

export const { setReduxUsers } = userSlice.actions

export default userSlice.reducer