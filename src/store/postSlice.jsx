import { createSlice } from '@reduxjs/toolkit'

export const postSlice = createSlice({
  name: 'post',
  initialState: {
     posts: {
      posts: [],
      activePost: 0,
      activePostItem: {},
      addPostShow: false,
      addEditShow: false,
     },
     announcements: {
      announcements: [],
      activeAnnouncement: 0,
      activeAnnouncementItem: {},
      addAnnouncementShow: false,
      addEditShow: false,
    },
    comments: {      
      comments: [], 
      list: [],
      activeComment: 0,
      activeCommentItem: {},
      addCommentShow: false,
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
    setReduxActiveComment: (state, event) => {
      state.comments.activeComment = event.payload
    },
    setReduxActiveCommentItem: (state, event) => {
      state.comments.activeCommentItem = event.payload
    },
    setToggleEditShow: state => {
      state.comments.editShow = true  
    },
    setToggleEditClose: state => {
      state.comments.editShow = false  
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
    },
    addPostShowToggle: state => {
      state.posts.addPostShow = !state.posts.addPostShow
      state.announcements.addAnnouncementShow = false
      state.comments.addCommentShow = false
      state.posts.addEditShow = false
    },
    addAnnouncementShowToggle: state => {
      state.announcements.addAnnouncementShow = !state.announcements.addAnnouncementShow
      state.posts.addPostShow = false
      state.comments.addCommentShow = false
      state.posts.addEditShow = false
    },
    addCommentShowToggle: state => {
      state.comments.addCommentShow = !state.comments.addCommentShow
      state.posts.addPostShow = false
      state.announcements.addAnnouncementShow = false
      state.posts.addEditShow = false
    },
    addEditPostShowToggle: state => {
      state.posts.addEditShow = !state.posts.addEditShow
      state.posts.addPostShow = false
      state.announcements.addAnnouncementShow = false
      state.comments.addCommentShow = false
    },
    addEditAnnouncementShowToggle: state => {
      state.announcements.addEditShow = !state.announcements.addEditShow
      state.posts.addPostShow = false
      state.announcements.addAnnouncementShow = false
      state.comments.addCommentShow = false
    },
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
  setReduxActiveComment,
  setReduxActiveCommentItem,
  setToggleEditShow,
  setToggleEditClose,
  resetPostCreation, 
  setReduxPageCountPosts, setReduxPageCountAnnouncements, setReduxPageNumPosts, 
  setReduxPageNumAnnouncements,
  addPostShowToggle,
  addAnnouncementShowToggle,
  addCommentShowToggle,
  addEditPostShowToggle,
  addEditAnnouncementShowToggle  
} = postSlice.actions

export default postSlice.reducer