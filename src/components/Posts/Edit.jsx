import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'
import { setReduxPageNumPosts } from '../../store/postSlice'
import { createPost } from '../../store/createSlice'
import { EditPost, Container, Name, Header, Title, Body, Icon, Dell, StyledNavLink } from '../../Assets/Styles/Posts/Edit'
import { finishDeletePost, finishUpdatePost } from '../../services/API/create'


const Edit = () => {
  const dispatch = useDispatch()  
  let history = useHistory()
  const { activePostItem } =
    useSelector(state => ({
      activePostItem: state.post.posts.activePostItem
    }))
  const [title, setTitle] = useState(activePostItem.title)
  const [body, setBody] = useState(activePostItem.body)  
  const isOtherPosts = async () => {
    await dispatch(finishDeletePost(activePostItem.id))
    return history.push('/')
  }
  const isAuth = () => {
    return activePostItem.userId === JSON.parse(localStorage.getItem('user')).id
  }
  const titleHandle = e => {
    let val = e.target.value
    setTitle(val)
  }
  const bodyHandle = e => {
    let val = e.target.value
    setBody(val)
  }
  const getItem = () => { 
    let postItem = {
      title, body,
      userId: JSON.parse(localStorage.getItem('user')).id,
      createdAt: activePostItem.createdAt,
      updatedAt: new Date().toISOString()
    }
    dispatch(createPost(postItem))
  }
  return (
    <EditPost>
      <Container>
        <Header>
          <StyledNavLink to={'/'} onClick={() => {
            dispatch(setReduxPageNumPosts(1))
          }}>
            <Name>{activePostItem.user.firstname} {activePostItem.user.lastname}</Name>
          </StyledNavLink>
          {isAuth() &&
            <Icon className="material-icons" onClick={() => {
            getItem()
            dispatch(finishUpdatePost(activePostItem.id))
            history.push('/')
            }}>done_all</Icon>
          }
        </Header>
        <h1><Title value={title} onChange={e => { titleHandle(e) }}/></h1>
          <Body value={body} onChange={e => { bodyHandle(e) }}/>
        {isAuth() &&
          <Dell>
            <Icon className="material-icons" onClick={() => isOtherPosts()}>delete</Icon>
          </Dell>
        }
      </Container>
    </EditPost>
  )
}
export default Edit