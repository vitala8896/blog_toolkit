import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { finishCreateComment } from './../../services/API/create'
import { createComment } from '../../store/createSlice'
import { Creator, NewComment, Add } from '../../Assets/Styles/Comments/Creator'

const CommentCreator = () => {
  const dispatch = useDispatch()
  const [value, setValue] = useState('')
  const { activePost } = useSelector(state => ({
    activePost: state.post.posts.activePost
  }))
  const onChangeHandler = e => {
    setValue(e.target.value)   
    const item = {
      postId: activePost,
      body: e.target.value,  
      userId:JSON.parse(localStorage.getItem('user')).id,          
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    dispatch(createComment(item))
  }
  return (
    <>
      {localStorage.getItem('user') &&
        <Creator>
          <NewComment
            value={value}
            placeholder='Enter your comment'
            onChange={e => onChangeHandler(e)}
          />
          <Add onClick={() => {
            dispatch(finishCreateComment(activePost))
            setValue('')
          }
          } className="material-icons">add</Add>
        </Creator>
      }
    </>
  )
}
export default CommentCreator