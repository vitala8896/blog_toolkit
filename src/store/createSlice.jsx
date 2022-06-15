import { createSlice } from '@reduxjs/toolkit'

export const create = createSlice({
  name: 'create',
  initialState: {
    post: {},
    announcement: {},
    comment: {},
  },
  reducers: {
    createPost: (state, event) => {
      state.post = event.payload;   
    }, 
    createAnnouncement: (state, event) => {
      state.announcement = event.payload  
    },
    createComment: (state, event) => {
      state.comment = event.payload;   
    }, 
    resetPostDelete: state => {
      state.post = {}   
    },
    resetAnnouncementCreation: state => {
      state.announcement = {}   
    },
    resetCommentCreation: state => {
      state.comment = {}   
    },
    resetCommentDelete: state => {
      state.comment = {}   
    },
    resetAnnouncementDelete: state => {
      state.announcement = {}   
    },    
  },
})

export const { 
  createPost, 
  createAnnouncement, 
  createComment, 
  resetPostDelete, 
  resetAnnouncementCreation, 
  resetAnnouncementDelete, 
  resetCommentCreation, 
  resetCommentDelete 
} = create.actions

export default create.reducer