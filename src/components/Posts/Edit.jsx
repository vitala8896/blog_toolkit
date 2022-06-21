import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import styled from 'styled-components'
import { createPost } from "../../store/createSlice"
import TextareaAutosize from 'react-textarea-autosize'
import { addPostShowToggle, addEditPostShowToggle } from "../../store/postSlice"
import close from "./../../Assets/Images/close.jpg"
import { finishUpdatePost, finishDeletePost } from './../../services/API/create'

const Edit = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  const { activePostItem, addEditShow } = useSelector(state => ({
    activePostItem: state.post.posts.activePostItem,
    addEditShow: state.post.posts.addEditShow
  }))
  const { register, handleSubmit, formState: { errors },
  } = useForm({
    defaultValues: {
      title: activePostItem.title,
      body: activePostItem.body    
    }
  })      
  const [title, setTitle] = useState(activePostItem.title)
  const [body, setBody] = useState(activePostItem.body)
  const titleHandle = e => {
    let val = e.target.value
    setTitle(val)
  }
  const bodyHandle = e => {
    let val = e.target.value
    setBody(val)
  }
  return (
    <StyleForm className="slide-in-top" style={ addEditShow? {display: 'flex'}:{display: 'none'}}>
      <Form onSubmit={handleSubmit(data => {
        dispatch(createPost({
          ...data, 
          userId: JSON.parse(localStorage.getItem('user')).id, 
          createdAt: new Date().toISOString(), 
          updatedAt: new Date().toISOString()
        }))
        dispatch(finishUpdatePost(activePostItem.id))
        dispatch(addEditPostShowToggle())
        history.push(`/posts/${activePostItem.id}`)
      })        
      }>
        <Header>
          <Title>Edit Post</Title>
          <Close src={close} onClick={()=>dispatch(addEditPostShowToggle())}/> 
        </Header>        
        <Input value={title} type="text" {...register("title", {required: true, minLength: 2, maxLength: 30})} placeholder="Please enter title." onChange={e => { titleHandle(e) }}/>
        {errors.title && "min length: 2, maxLength: 30"}
        <Textarea value={body} type="text" {...register("body", {required: true, minLength: 2})} placeholder="Please enter body." onChange={e => { bodyHandle(e) }}/>
        {errors.body && "min length: 2"}
        <Btns>
          <Button type="submit">Edit</Button>
          <Button type="button"
          onClick={() => {
            dispatch(finishDeletePost(activePostItem.id))
            dispatch(addEditPostShowToggle())
            history.push('/')
          }} 
          >Delete</Button> 
        </Btns>       
      </Form>
    </StyleForm>
  )
}

export { Edit }

const StyleForm = styled.div`
  position: fixed;  
  top: 0;  
  display: none;
  align-items: center;
  justify-content: center; 
  height: 100vh;
  width: 100%;
  background: rgba(0%, 53%, 87%, .18);  
  &.slide-in-top {
    -webkit-animation: slide-in-top 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
            animation: slide-in-top 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
  }   
  @-webkit-keyframes slide-in-top {
    0% {
      -webkit-transform: translateY(-1000px);
              transform: translateY(-1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateY(0);
              transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes slide-in-top {
    0% {
      -webkit-transform: translateY(-1000px);
              transform: translateY(-1000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateY(0);
              transform: translateY(0);
      opacity: 1;
    }
  }
`
const Form = styled.form`
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  height: auto;
  padding: 20px;
  max-width: 100%;
  & {
    color: red;
  }
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`
const Title = styled.div`
  color: #eee;
  font-family: sans-serif;
  font-size: 36px;
  font-weight: 600; 
  
`
const Close = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer
`
const Input = styled.input`
  background-color: #303245;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  font-size: 18px;
  height: 50px;
  outline: 0;
  padding: 0 20px 0;
  margin-bottom: 10px;
  width: 100%;  
`
const Textarea = styled(TextareaAutosize)`
  background-color: #303245;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  font-size: 18px;
  min-height: 50px;
  max-height: 500px;
  outline: 0;
  padding: 10px 20px 0;
  margin-bottom: 10px;
  width: 100%;  
  resize: none;
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
const Btns = styled.div`
  display: flex;
  justify-content: space-between;  
`