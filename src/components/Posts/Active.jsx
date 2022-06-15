import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'
import Comments from '../Comments/Comments'
import { setReduxActivePost, setReduxPageNumPosts, fetchStart } from '../../store/postSlice'
import { Active, Container, Title, Header, Body, Name, Dell, Icon, StyledNavLink } from '../../Assets/Styles/Posts/Active'
import { getActivePost } from './../../services/API/post'
import { finishDeletePost } from './../../services/API/create'
import { Loader } from './../UI/Loader/Loader';

const ActivePost = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  const { activePost, activePostItem, pageNum, pageSize, loading } =
  useSelector(state => ({
    activePost: state.post.posts.activePost,
    activePostItem: state.post.posts.activePostItem,
    pageNum: state.post.pagination.posts.pageNum,
    pageSize: state.post.pagination.pageSize,
    loading: state.post.loading
  }))
  useEffect( () => {  
    dispatch(fetchStart())  
    const setURL = () => {
      let numURL = +history.location.pathname.replace('/posts/', '')
      dispatch(setReduxActivePost(numURL))
      return numURL
    } 
    let thisURL = activePost === 0? setURL() : activePost   
    dispatch(getActivePost(thisURL))
  }, [])
  
  const dellPost = () => {    
    dispatch(finishDeletePost(activePost, pageNum, pageSize))
    dispatch(setReduxPageNumPosts(1))
    return history.push('/')
  }
  const isAuth = () => {
    return activePostItem.user.id === JSON.parse(localStorage.getItem('user')).id
  }  
  const render = () => {
    if (activePostItem.id) {
      return (
        <Container>
          <Header>
            <StyledNavLink to={'/'} onClick={() => {
              dispatch(setReduxPageNumPosts(1))
            }}>
              <Name> {activePostItem.user.firstname} {activePostItem.user.lastname}</Name>
            </StyledNavLink>
            {isAuth() &&
              <Icon className="material-icons" onClick={() => { history.push(`/posts/${activePost}/edit`) }}>edit</Icon>
            }
          </Header>
          <Title>{activePostItem.title}</Title>
          <Body>{activePostItem.body}</Body>
          {isAuth() &&
            <Dell>
              <Icon className={"material-icons"} onClick={() => dellPost()}>delete</Icon>
            </Dell>
          }
        </Container>
      ) 
    }    
  }
  return (
    <Active>
      { loading ? <Loader /> : render()}
      <Comments />
    </Active>
  )
}
export default ActivePost