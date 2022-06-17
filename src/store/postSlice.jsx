import { createSlice } from '@reduxjs/toolkit'

export const postSlice = createSlice({
  name: 'post',
  initialState: {
     posts: {
      posts: [],
      activePost: 0,
      activePostItem: {},
     },
     announcements: {
      announcements: [],
      activeAnnouncement: 0,
      activeAnnouncementItem: {},
    },
    comments: {
      comments: [], 
      list: []
    }, 
    pagination: {
      posts: {
        list: [], 
        pageNum: 1,      
        pageCount: [],
        pageSize: 20, 
      },
      announcements: {
        list: [], 
        pageNum: 1,
        pageCount: [],
        pageSize: 10,
      } 
    },
    loading: false,
    error: null,
    isFinished: false, 
    avatarURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9BgREGwGBtdG9th6TjSLJu4PA7FaRkqfI2A&usqp=CAU'
  },
  reducers: {
    fetchStart: state => {
      state.loading = true 
    }, 
    setReduxPosts: (state, event) => {
      state.posts.posts = event.payload
      state.loading = false   
    },  
    setReduxPostsList: (state, event) => {
      state.pagination.posts.list = event.payload
    },  
    setReduxAnnouncementsList: (state, event) => {
      state.pagination.announcements.list = event.payload
    },
    setReduxCommentsList: (state, event) => {
      state.comments.list = event.payload
      state.loading = false 
    },
    setReduxActivePost: (state, event) => {
      state.posts.activePost = event.payload
    },  
    setReduxActivePostItem: (state, event) => {
      state.posts.activePostItem = event.payload
    },  
    setReduxAnnouncements: (state, event) => {
      state.announcements.announcements = event.payload
      state.loading = false 
    },  
    setReduxActiveAnnouncement: (state, event) => {
      state.announcements.activeAnnouncement = event.payload
    },   
    setReduxActiveAnnouncementItem: (state, event) => {
      state.announcements.activeAnnouncementItem = event.payload
    },
    setReduxComments: (state, event) => {
      state.comments.comments = event.payload  
    },
    resetPostCreation: state => {
      state.post = {}   
    },
    setReduxPageCountPosts: (state, event) => {
      state.pagination.posts.pageCount = event.payload;   
    },   
    setReduxPageCountAnnouncements: (state, event) => {
      state.pagination.announcements.pageCount = event.payload;   
    },
    setReduxPageNumPosts: (state, event) => {
      state.pagination.posts.pageNum = event.payload;   
    },
    setReduxPageNumAnnouncements: (state, event) => {
      state.pagination.announcements.pageNum = event.payload;   
    }
  },
})

export const { 
  fetchStart, 
  setReduxPosts, 
  setReduxPostsList, 
  setReduxAnnouncementsList, 
  setReduxCommentsList,
  setReduxActivePost, 
  setReduxActivePostItem, 
  setReduxAnnouncements, 
  setReduxActiveAnnouncement, setReduxActiveAnnouncementItem, 
  setReduxComments, 
  resetPostCreation, 
  setReduxPageCountPosts, setReduxPageCountAnnouncements, setReduxPageNumPosts, 
  setReduxPageNumAnnouncements
} = postSlice.actions

export default postSlice.reducer