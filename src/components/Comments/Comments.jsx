import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import person from './../../Assets/Images/person.svg'
import CommentCreator from './Creator'
import styled from 'styled-components'
import { getReduxComments } from './../../services/API/post'
import { setReduxCommentsList, setReduxActiveComment, setReduxActiveCommentItem, addCommentShowToggle } from '../../store/postSlice'


const Comments = () => {
  const dispatch = useDispatch()
  const { loading, list, comments, activePost } = useSelector(state => ({
    loading: state.post.loading,
    list: state.post.comments.list,
    comments: state.post.comments.comments,
    editShow: state.post.comments.editShow,
    activePost: state.post.posts.activePost
  }))
  useEffect( () => {
    dispatch(getReduxComments(activePost)) 
  }, [dispatch, activePost])
  useEffect(() => { 
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
  }, [activePost, comments])  
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
        <Item  key={key}
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
      )
    })
  } 
  return (
    <StyleComments>   
      { !loading && <CommentCreator />}
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