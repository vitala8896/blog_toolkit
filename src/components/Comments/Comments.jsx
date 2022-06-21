import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import person from './../../Assets/Images/person.svg'
import CommentCreator from './Creator'
import styled from 'styled-components'
import { getReduxComments } from './../../services/API/post'
import { setReduxCommentsList, setToggleEditShow, setReduxActiveComment, setReduxActiveCommentItem, addCommentShowToggle } from '../../store/postSlice'


const Comments = () => {
  const dispatch = useDispatch()
  const { list, comments, activePost, activeCommentItem } = useSelector(state => ({
    list: state.post.comments.list,
    comments: state.post.comments.comments,
    editShow: state.post.comments.editShow,
    activePost: state.post.posts.activePost,
    activeCommentItem: state.post.comments.activeCommentItem
  }))
  useEffect( () => {
    dispatch(getReduxComments(activePost)) 
  }, [activePost])
  useEffect(() => {
    if (comments?.length) {
      const list = comments.map(item => {
        return {
          id: item.id,
          postId: item.postId,
          userId: item.userId,
          user: item.user,
          body: item.body,
          create: new Date(item.createdAt).toLocaleDateString()
        }
      })
      dispatch(setReduxCommentsList(list))
    }      
  }, [comments])  
  const checkMyComment = id => {
    if(localStorage.getItem('user')){
      return id === JSON.parse(localStorage.getItem('user')).id
    }else{
      return false
    }     
  }
  const renderActiveComments = () => { 
    return list.map((item, key) => {
      return (
        <StyledNavLink key={key}
            to={checkMyComment(item.userId) ? `/posts/${activePost}` : `/posts/${activePost}`}
        >
        <Item 
        onClick={()=>{ 
          checkMyComment(item.userId) && 
          dispatch(addCommentShowToggle())
          dispatch(setReduxActiveComment(item.id))
          dispatch(setReduxActiveCommentItem(item))
        }}
        > 
          <Img>
            <Avatar src={item.user.avatar? item.user.avatar : person} alt='' />
          </Img>
          <div>
            {item.user.firstname} {item.user.lastname} - {item.body} 
          </div>                  
        </Item>
        </StyledNavLink>
      )
    })
  } 
  return (
    <StyleComments>      
      <CommentCreator />
      {renderActiveComments()}
    </StyleComments>
  )
}
export default Comments

const StyleComments = styled.div`
  padding-top: 10px;
  color: rgb(0, 0, 0);
  width: 70%; 
  @media (max-width: 1250px){
    width: 95%;
  }
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  min-height: 40px;
  :hover .material-icons {
    display: block;
  }
`;
const Img = styled.div`
  min-width: 50px;  
`;
const Avatar = styled.img`
  width: 40px;
  height: auto;
  border-radius: 50%;
`;
const Dell = styled.span`
  display: none; 
  border-radius: 50%;
  transition: all 3.3s ease-in;
  margin-left: 10px;  
`;
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;