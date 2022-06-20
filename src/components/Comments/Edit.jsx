import * as React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import TextareaAutosize from 'react-textarea-autosize'
import { finishDeleteComment } from '../../services/API/create'
import { createComment } from '../../store/createSlice'
import { finishUpdateComment } from './../../services/API/create'



const EditComment = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  
  const { register, handleSubmit, formState: { errors },
  } = useForm()  
  const { activePost, comments, activeComment, activeCommentItem, create } = useSelector(state => ({
    activePost: state.post.posts.activePost,
    comments: state.post.comments.comments,    
    activeComment: state.post.comments.activeComment,
    activeCommentItem: state.post.comments.activeCommentItem,
    create: state.create.comment
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
      <Form onSubmit={handleSubmit(data => {
        getItem(data.comment)
        dispatch(finishUpdateComment(activeComment))
        history.push(`/posts/${activePost}`)
      })        
      }>
        <Title>Edit comment</Title>
        <Textarea type="text" value={thisComment} {...register("comment")} placeholder="Please enter your comment." onChange={ e=>{setCommentHandler(e)}}/>
        {errors.comment && "min length: 2"}  
        <Btns>
          <Button type="submit">Edit</Button>
          <Button type="button"
          onClick={() => {
            dispatch(
              finishDeleteComment(activeComment, activePost))
              history.push('/posts/'+ activePost)
          }} 
          >Delete</Button> 
        </Btns>       
      </Form>
    </StyleForm>   
  )
}

export { EditComment }

const StyleForm = styled.div`
  // position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center; 
  width: 100%;
  height: 100vh;
  background: linear-gradient(#141e30, #243b55); 
`
const Form = styled.form`
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  height: auto;
  width: 70%;
  padding: 20px;
  width: 70%;
  // z-index: 1;
  & {
    color: red;
  }
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