// import * as React from "react"
import { useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import styled from 'styled-components'
import { createPost } from "../../store/createSlice"
import { finishCreatePost } from './../../services/API/create'
import TextareaAutosize from 'react-textarea-autosize'
import { addPostShowToggle } from "../../store/postSlice"
import close from "./../../Assets/Images/close.jpg"

const CreatePost = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  const { register, handleSubmit, formState: { errors },
  } = useForm()  
  const { addPostShow } = useSelector(state => ({
    addPostShow: state.post.posts.addPostShow
  }))
  return (
    <StyleForm className="slide-in-top" style={ addPostShow? {display: 'flex'}:{display: 'none'}}>
      <Form onSubmit={handleSubmit(data => {
        dispatch(createPost({
          ...data, 
          userId: JSON.parse(localStorage.getItem('user')).id, 
          createdAt: new Date().toISOString(), 
          updatedAt: new Date().toISOString()
        }))
        dispatch(finishCreatePost())
        dispatch(addPostShowToggle())
        history.push('/')
      })        
      }>
        <Header>
          <Title>New Post</Title>
          <Close src={close} onClick={()=>dispatch(addPostShowToggle())}/> 
        </Header>        
        <Input type="text" {...register("title", {required: true, minLength: 2, maxLength: 30})} placeholder="Please enter title."/>
        {errors.title && "min length: 2, maxLength: 30"}
        <Textarea type="text" {...register("body", {required: true, minLength: 2})} placeholder="Please enter body."/>
        {errors.body && "min length: 2"}
        <Button type="submit">Submit</Button>        
      </Form>
    </StyleForm>
  )
}

export { CreatePost }

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
  max-width: 80%;
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
  width: 100%;
  :active {
    background-color: #06b;
  }
`