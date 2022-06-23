import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import TextareaAutosize from 'react-textarea-autosize'
import { finishDeleteComment } from '../../services/API/create'
import { createComment } from '../../store/createSlice'
import { finishUpdateComment } from './../../services/API/create'
import { getReduxComments } from './../../services/API/post'
import close from "./../../Assets/Images/close.jpg"
import { addCommentShowToggle } from "./../../store/postSlice"



const EditComment = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  
  const { register, handleSubmit, formState: { errors },
  } = useForm()  
  const { activePost, activeComment, activeCommentItem } = useSelector(state => ({
    activePost: state.post.posts.activePost,    
    activeComment: state.post.comments.activeComment,
    activeCommentItem: state.post.comments.activeCommentItem
  }))
  const [thisComment, setComment] = useState(activeCommentItem.body)
  const setCommentHandler = e => {
    setComment(e.target.value)
  }
  const getItem = data => { 
    let commentItem = {
      id: activeComment,
      postId: activeCommentItem.postId,
      body: data,
      userId: JSON.parse(localStorage.getItem('user')).id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    dispatch(createComment(commentItem))
  }
  return (
      <StyleForm>
      <Form onSubmit={handleSubmit(async data => {
        getItem(data.comment)
        await dispatch(addCommentShowToggle())
        await dispatch(finishUpdateComment(activeComment))
        await dispatch(getReduxComments(activePost))        
        history.push(`/posts/${activePost}`)
      })        
      }>
        <Header>
          <Title>Edit comment</Title>
          <Close src={close} onClick={()=>dispatch(addCommentShowToggle())}/> 
        </Header>
        <Textarea type="text" value={thisComment} {...register("comment")} placeholder="Please enter your comment." onChange={ e=>{setCommentHandler(e)}}/>
        {errors.comment && "min length: 2"}  
        <Btns>
          <Button type="submit">Edit</Button>
          <Button type="button"
          onClick={() => {
            dispatch( finishDeleteComment(activeComment, activePost))
            dispatch(addCommentShowToggle())
              history.push(`/posts/${activePost}`)
          }} 
          >Delete</Button> 
        </Btns>       
      </Form>
    </StyleForm>   
  )
}

export { EditComment }

const StyleForm = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center; 
  width: 100%;
  height: 100vh;
  background: rgba(0%, 53%, 87%, .18);
`
const Form = styled.form`
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  height: auto;
  width: 70%;
  padding: 20px;
  & {
    color: red;
  }
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`
const Close = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer
`
const Title = styled.p`
  color: #eee;
  font-family: sans-serif;
  font-size: 36px;
  font-weight: 600;  
`
const Textarea = styled(TextareaAutosize)`
  background-color: #303245;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  font-size: 18px;
  min-height: 50px;
  outline: 0;
  padding: 10px 20px 0;
  margin-bottom: 10px;
  width: 100%;  
  resize: none
`
const Btns = styled.div`
  display: flex;
  justify-content: space-between;  
`
const Button = styled.button`
  background-color: #08d;  
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  cursor: pointer;
  font-size: 18px;
  height: 50px;
  margin-top: 10px;
  text-align: center;
  width: 49%;
  :active {
    background-color: #06b;
  }
`