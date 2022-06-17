import * as React from "react"
import { useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import styled from 'styled-components'
import { loginUser } from '../../store/authSlice'


const LoginForm = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  const { register, handleSubmit, formState: { errors },
  } = useForm({
    defaultValues: {
      email: 'vitala8896@gmail.com'
    }
  })
  const changeToRegister = () => {
    return history.push('/auth/register') 
  }
  return (
    <StyleForm>
      <Form onSubmit={handleSubmit(data => {
        dispatch(loginUser({...data}))
        history.push('/')
      })        
      }>
        <Title>Login</Title>
        <Input type="email" {...register("email", {required: true, minLength: 4, maxLength: 30, pattern: /^\S+@\S+$/i})} placeholder="Please enter your email."/>
        {errors.email && "min length: 4, maxLength: 30"}
        <Input type="password" {...register("password", {required: true, minLength: 2})} placeholder="Please enter your password."/>
        {errors?.password && "min length: 2"}
        <Button type="submit">Submit</Button>
        <GoTo onClick={changeToRegister}>go to register</GoTo>        
      </Form>
    </StyleForm>
  )
}

export { LoginForm }

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