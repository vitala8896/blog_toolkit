import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import person from './../../Assets/Images/person.svg'
import CommentCreator from './Creator'
import { finishDeleteComment } from './../../services/API/create'
import { StyleComments, Item, Img, Avatar, Dell } from '../../Assets/Styles/Comments/Comments'
import { getReduxComments } from './../../services/API/post'
import { setReduxCommentsList } from '../../store/postSlice'

const Comments = () => {
  const dispatch = useDispatch()
  const { list, comments, activePost } = useSelector(state => ({
    list: state.post.comments.list,
    comments: state.post.comments.comments,
    activePost: state.post.posts.activePost
  }))
  // console.log(list)
  useEffect( () => {
    dispatch(getReduxComments(activePost)) 
  }, [activePost])
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
  }, [comments])  

  const renderActiveComments = () => { 
    return list.map((item, key) => {
      return (
        <Item key={key}>
          <Img>
            <Avatar src={item.user.avatar? item.user.avatar : person} alt='' />
          </Img>
          <div>
            {item.user.firstname} {item.user.lastname} - {item.body} 
          </div>
          {item.userId === JSON.parse(localStorage.getItem('user')).id && <Dell className="material-icons" onClick={() => { dispatch(finishDeleteComment(item.id, activePost)) }}>delete</Dell>}
        </Item>
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