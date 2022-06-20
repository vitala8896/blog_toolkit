import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    addUserShow: false
  },
  reducers: {  
    setReduxUsers: (state, event) => {
      state.users = event.payload;   
    },
    addUserShowToggle: state => {
      state.addUserShow = !state.addUserShow
    }
  },
})

export const { setReduxUsers, addUserShowToggle } = userSlice.actions

export default userSlice.reducer
// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9BgREGwGBtdG9th6TjSLJu4PA7FaRkqfI2A&usqp=CAU