import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { finishCreateComment } from './../../services/API/create'
import { createComment } from '../../store/createSlice'
import styled from 'styled-components'
import TextareaAutosize from 'react-textarea-autosize'

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
      postId: activePost, 
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

const Creator = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const NewComment = styled(TextareaAutosize)`
  background: #f5f1f1;
  border-bottom: 1px solid rgb(209, 209, 209);
  border-radius: 5px;
  min-height: 40px;
  padding: 0 15px;
  flex-grow: 1;
  margin: 0 5px;
  resize: none
`;
const Add = styled.span`
  background: #b3b3b3;
  border-radius: 50%;
  :hover {
    background: #6b6b6b;
    cursor: pointer;
  }
`;