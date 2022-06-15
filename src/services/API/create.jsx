import axios from './../axios'
import { resetCommentCreation } from '../../store/createSlice'
import { setReduxAnnouncements, setReduxComments, setReduxPosts, resetPostCreation, setReduxPageCountAnnouncements } from '../../store/postSlice'
import { getReduxPosts } from './post'
import { setReduxPageCountPosts } from '../../store/postSlice'
import { resetPostDelete, resetAnnouncementCreation } from '../../store/createSlice'


export const finishCreatePost = () => {
  return async (dispatch, getState) => {
    await axios.post('/posts', getState().create.post)
    dispatch(resetPostCreation())
    dispatch(getReduxPosts())
  }
}
export const finishCreateAnnouncement = () => {
  return async (dispatch, getState) => {
    await axios.post('/announcements', getState().create.announcement)
    dispatch(resetAnnouncementCreation())
  }
}
export const finishUpdatePost = id => {
  return async (dispatch, getState) => {
    try {
      await axios.patch(`/posts/` + id, getState().create.post)
      dispatch(resetPostCreation())
      dispatch(getReduxPosts(1, 20))
    } catch (e) {
      console.log(e)
    }    
  }
}
export const finishUpdateAnnouncement = (id, pageNum = 1, pageSize = 10) => {
  return async (dispatch, getState) => {
    try {
      await axios.patch(`/announcements/` + id, getState().create.announcement)
      dispatch(resetAnnouncementCreation())
      await axios.get(`/announcements?_sort=createdAt&_order=desc&_expand=user&_page=${pageNum}&_limit=${pageSize}`)
    .then((response) => {
      dispatch(setReduxAnnouncements(response.data))
      let pages = Math.ceil(response.headers['x-total-count'] / pageSize)
      let pagesArray = []
      for (let i = 1; i <= pages; i++) {
        pagesArray.push(i);
      }
      dispatch(setReduxPageCountAnnouncements(pagesArray))
      })      
    } catch (e) {
      console.log(e)
    }
  }
}

export const finishCreateComment = activePost => {
  return async (dispatch, getState) => {
    await axios.post('/comments', getState().create.comment)
    await dispatch(resetCommentCreation())
    await axios.get(`/comments?postId=${activePost}&_sort=createdAt&_order=desc&_expand=user`).then(response => {
      dispatch(setReduxComments(response.data))
    })    
  }
}
export const finishDeletePost = (id, pageNum = 1, pageSize = 20) => {
  return async dispatch => {
    await axios.delete('/posts/' + id)
    dispatch(resetPostDelete())
    await axios.get(`/posts?_sort=createdAt&_order=desc&_expand=user&_page=${pageNum}&_limit=${pageSize}`)
    .then((response) => {
      dispatch(setReduxPosts(response.data))
      let pages = Math.ceil(response.headers['x-total-count'] / pageSize)
      let pagesArray = []
      for (let i = 1; i <= pages; i++) {
        pagesArray.push(i);
      }
      dispatch(setReduxPageCountPosts(pagesArray))
    }) 
  }
}
export const finishDeleteAnnouncement = (id, pageNum = 1, pageSize = 10) => {
  return async dispatch => {
    await axios.delete('/announcements/' + id)
    await axios.get(`/announcements?_sort=createdAt&_order=desc&_expand=user&_page=${pageNum}&_limit=${pageSize}`)
    .then((response) => {
      dispatch(setReduxAnnouncements(response.data))
      let pages = Math.ceil(response.headers['x-total-count'] / pageSize)
      let pagesArray = []
      for (let i = 1; i <= pages; i++) {
        pagesArray.push(i);
      }
      dispatch(setReduxPageCountAnnouncements(pagesArray))
    })
  }
}
export const finishDeleteComment = (id, activePost) => {
  return async dispatch => {
    await axios.delete('/comments/' + id)
    await axios.get(`/comments?postId=${activePost}&_sort=createdAt&_order=desc&_expand=user`).then(response => {
      dispatch(setReduxComments(response.data))
    })    
  }
}