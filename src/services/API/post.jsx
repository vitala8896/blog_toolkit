import axios from './../axios'
import { setReduxPosts, setReduxActivePost, setReduxActivePostItem, setReduxAnnouncements, setReduxActiveAnnouncement, setReduxActiveAnnouncementItem, setReduxComments, setReduxPageCountAnnouncements } from '../../store/postSlice'
import { setReduxPageCountPosts } from '../../store/postSlice'


export const getReduxPosts = (pageNum, pageSize) => {  
  return async dispatch => {
    try {
      await axios.get(`/posts?_sort=createdAt&_order=desc&_expand=user&_page=${pageNum}&_limit=${pageSize}`)
      .then(response => {
        dispatch(setReduxPosts(response.data))
        let pages = Math.ceil(response.headers['x-total-count'] / pageSize)
        let pagesArray = []
        for (let i = 1; i <= pages; i++) {
          pagesArray.push(i);
        }
        dispatch(setReduxPageCountPosts(pagesArray))
      })       
    } catch (e) {
      console.log(e)
    }
  }
}
export const getReduxAnnouncements = (pageNum, pageSize) => {  
  return async dispatch => {
    try {
      await axios.get(`/announcements?_sort=createdAt&_order=desc&_expand=user&_page=${pageNum}`).then(response => {
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
export const getReduxComments = activePost => {  
  return async dispatch => {
    await axios.get(`/comments?postId=${activePost}&_sort=createdAt&_order=desc&_expand=user`).then(response => {
      dispatch(setReduxComments(response.data))
    })
  }    
}
export const getActivePost = thisURL => {   
  return async dispatch => {
    try {
      await axios.get(`/posts/${thisURL}?_expand=user`).then(response => {
        dispatch(setReduxActivePost(response.data.id))
        dispatch(setReduxActivePostItem(response.data))
      }) 
    } catch (e) {
      console.log(e)
    }
  }
}
export const getActiveAnnouncement = thisURL => {   
  return async dispatch => {
    try {
      await axios.get(`/announcements/${thisURL}?_expand=user`).then(response => {
        dispatch(setReduxActiveAnnouncement(response.data.id))
        dispatch(setReduxActiveAnnouncementItem(response.data))
      }) 
    } catch (e) {
      console.log(e)
    }
  }
}