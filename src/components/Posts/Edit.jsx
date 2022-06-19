import { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from 'react-router-dom'
import { setReduxPageNumPosts } from '../../store/postSlice'
import { createPost } from '../../store/createSlice'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import TextareaAutosize from 'react-textarea-autosize'
import { finishDeletePost, finishUpdatePost } from '../../services/API/create'


const Edit = () => {
  const dispatch = useDispatch()  
  let history = useHistory()
  const { activePostItem } = useSelector(state => ({
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

const EditPost = styled.div`
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
const Header = styled.div`
  display: flex;
  justify-content: space-between;  
`;
const Name = styled.p`
  color: white;
  :hover {
    color: rgb(167, 167, 167);
  }
`;
const Title = styled.input`
  background: #7969e6;
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 15px;
  
`;
const Body = styled(TextareaAutosize)`
  margin: 0;
  background: #7969e6;
  width: 100%;
  padding: 10px 15px;
  resize: none
`;
const Icon = styled.span`
  color: #fff; 
  border-radius: 50%;
  padding: 8px;
  :hover {
    background: rgb(8, 9, 63);
    transition: all .6s ease-in;
  }
`;
const Dell = styled.span`
  display: flex;
  justify-content: flex-end;  
`;
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;