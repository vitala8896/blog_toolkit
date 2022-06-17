import * as React from "react"
import { useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import styled from 'styled-components'
import { createAnnouncement } from "../../store/createSlice"
import TextareaAutosize from 'react-textarea-autosize'
import { finishCreateAnnouncement } from "../../services/API/create"


const CreateAnnouncement = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  const { register, handleSubmit, formState: { errors },
  } = useForm()
  return (
    <StyleForm>
      <Form onSubmit={handleSubmit(data => {
        dispatch(createAnnouncement({
          ...data, 
          userId: JSON.parse(localStorage.getItem('user')).id, 
          createdAt: new Date().toISOString(), 
          updatedAt: new Date().toISOString()
        }))
        dispatch(finishCreateAnnouncement())
        history.push('/announcements')
      })        
      }>
        <Title>New Announcement</Title>
        <Input type="text" {...register("title", {required: true, minLength: 2, maxLength: 30})} placeholder="Please enter title."/>
        {errors.title && "min length: 2, maxLength: 30"}
        <Textarea type="text" {...register("body", {required: true, minLength: 2})} placeholder="Please enter body."/>
        {errors.body && "min length: 2"}
        <Button type="submit">Submit</Button>        
      </Form>
    </StyleForm>
  )
}

export { CreateAnnouncement }

const StyleForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; 
  height: 100vh;
  background: linear-gradient(#141e30, #243b55);  
`
const Form = styled.form`
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  height: auto;
  padding: 20px;
  width: 70%;
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