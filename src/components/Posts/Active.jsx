import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'
import Comments from '../Comments/Comments'
import { setReduxActivePost, setReduxPageNumPosts } from '../../store/postSlice'
import { getActivePost } from './../../services/API/post'
import { finishDeletePost } from './../../services/API/create'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { EditComment } from '../Comments/Edit'

const ActivePost = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  const { activePost, activePostItem, pageNum, pageSize, editCommentShow } =
  useSelector(state => ({
    activePost: state.post.posts.activePost,
    activePostItem: state.post.posts.activePostItem,
    pageNum: state.post.pagination.posts.pageNum,
    pageSize: state.post.pagination.pageSize,
    editCommentShow: state.post.comments.editShow
  }))
  useEffect( () => {   
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
      {/* {editCommentShow && <EditComment/>} */}
      {render()}
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
const Title = styled.h1`
 font-size: 20px;
  display: flex;
  justify-content: space-between;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Body = styled.p`
  margin: 0;
`;
const Dell = styled.p`
  display: flex;
  justify-content: flex-end;
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