import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'
import Comments from '../Comments/Comments'
import { setReduxActivePost, setReduxPageNumPosts, addEditPostShowToggle, resetReduxComments } from '../../store/postSlice'
import { getActivePost } from './../../services/API/post'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { EditComment } from '../Comments/Edit'
import { Edit } from './Edit'
import TextareaAutosize from 'react-textarea-autosize'
import { Loader } from './../UI/Loader/Loader'


const ActivePost = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  const { loading, activePost, activePostItem, pageNum, pageSize, createPost, addCommentShow, addEditShow } =
  useSelector(state => ({
    loading: state.post.loading,
    activePost: state.post.posts.activePost,
    activePostItem: state.post.posts.activePostItem,
    pageNum: state.post.pagination.posts.pageNum,
    pageSize: state.post.pagination.pageSize,
    createPost: state.create.post,
    addCommentShow: state.post.comments.addCommentShow,
    addEditShow: state.post.posts.addEditShow
  }))
  useEffect( () => {  
    const setURL = () => {
      let numURL = +history.location.pathname.replace('/posts/', '')
      dispatch(setReduxActivePost(numURL))
      return numURL
    } 
    let thisURL = activePost === 0? setURL() : activePost   
    dispatch(getActivePost(thisURL))
  }, [createPost])
  
  const isAuth = () => {
    if(localStorage.getItem('user')){
      return activePostItem.user.id === JSON.parse(localStorage.getItem('user')).id
    }else{
      return false
    }
  }  
  const render = () => {
    if (activePostItem.id) {
      return (
        <Container>
          <Header>
            <StyledNavLink to={'/'} onClick={() => {
              dispatch(setReduxPageNumPosts(1))
              dispatch(resetReduxComments())
            }}>
              <Name> {activePostItem.user.firstname} {activePostItem.user.lastname}</Name>
            </StyledNavLink>
            {isAuth() &&
              <Icon className="material-icons" onClick={() => {
              dispatch(addEditPostShowToggle())
              history.push(`/posts/${activePost}`) }}>edit</Icon>
            }
          </Header>
          <Title>{activePostItem.title}</Title>
          <Body value={activePostItem.body}/>
        </Container>
      )       
    }    
  }
  useEffect( () => { 
    render()
  }, [activePost])
  return (
    <Active>
      {addCommentShow && <EditComment/>}
      {addEditShow && <Edit/>}
      {loading ? <Loader /> : render()}
      <Comments />
    </Active>
  )
}
export default ActivePost

const Active = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 90px 0 50px;
  width: 100%;
  height: auto;
  color: #fff; 
  cursor: pointer;
`;
const Container = styled.div`
  width: 70%;
  height: auto;
  border: 1px solid rgb(129, 129, 129);
  border-radius: 5px;
  background: linear-gradient(90deg, #5041b2 0%, #7969e6 100%);
  padding: 20px;
  @media (max-width: 1250px){
    width: 95%
  }
`;
const Title = styled.h1`  
  display: flex;
  justify-content: space-between;
  padding: 10px 15px ;
  font-size: 20px;
`;
const Header = styled.div`
  display: flex;
  padding: 10px 15px 0;
  border-radius: 5px;
  background: linear-gradient(90deg, #000 0%, #7969e6 100%);
`;
const Body = styled(TextareaAutosize)`
  background: linear-gradient(90deg, #5041b2 0%, #7969e6 100%);
  width: 100%; 
  height: auto; 
  resize: none;
`;
const Name = styled.p`
  color: white;
  font-size: 24px;
  padding-bottom: 15px;
  :hover {
    color: rgb(167, 167, 167);
  }
`;
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;
const Icon = styled.span`
  color: #fff; 
  border-radius: 50%;
  padding: 8px;
  height: 40px;
  :hover {
    background: rgb(8, 9, 63);
    transition: all .6s ease-in;
  }
`;