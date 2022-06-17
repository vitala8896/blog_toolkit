import * as React from "react"
import { useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import styled from 'styled-components'
import { registerUser } from '../../store/authSlice'


const RegisterForm = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  const { register, handleSubmit, formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: 'Віталій',
      lastname: 'Дячук',
      age: 18,
      email: 'vitala8896@gmail.com',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9BgREGwGBtdG9th6TjSLJu4PA7FaRkqfI2A&usqp=CAU'
    }
  })
  const changeToLogin = () => {
    return history.push('/auth/login') 
  }
  return (
    <StyleForm>
      <Form onSubmit={handleSubmit(data => {
        dispatch(registerUser({...data}))
        history.push('/')
      })
      }>
        <Title>Register</Title>
        <Input type="text" {...register("firstname", {required: true, minLength: 3})} placeholder="Enter firstname name"/>
        {errors?.firstname && "min length: 3"}
        <Input type="text" {...register("lastname", {required: true, minLength: 3})} placeholder="Enter lastname name"/>
        {errors.lastname && "min length: 3"}
        <Input type="number" {...register("age", {required: true, min: 2, max: 110})} placeholder="Please enter your age."/>
        {errors.age && "min: 2, max: 110"}
        <Input type="email" {...register("email", {required: true, minLength: 4, maxLength: 30, pattern: /^\S+@\S+$/i})} placeholder="Please enter your email."/>
        {errors.email && "min length: 4, maxLength: 30"}
        <Input type="password" {...register("password", {required: true, minLength: 2})} placeholder="Please enter your password."/>
        {errors?.password && "min length: 2"}
        <Input type="url" {...register("avatar", {required: true, minLength: 2})} placeholder="Please enter your image."/>
        {errors?.avatar && "min length: 2"}        
        <Button type="submit">Submit</Button>
        <GoTo onClick={changeToLogin}>go to login</GoTo>        
      </Form>
    </StyleForm>
  )
}

export { RegisterForm }

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
  width: 320px;
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
const GoTo = styled.p`
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  text-decoration: none;
  color: #08d;
  :hover {
    color: #06b;
  }  
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