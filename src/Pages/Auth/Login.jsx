import * as React from "react"
import { useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import styled from 'styled-components'
import { loginUser, showPopUpLoginToggle, showPopUpRegisterToggle } from '../../store/authSlice'
import close from "./../../Assets/Images/close.jpg"



const LoginForm = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  const { showPopUpLogin } = useSelector(state => ({
    showPopUpLogin: state.auth.showPopUpLogin
  }))
  const { register, handleSubmit, formState: { errors },
  } = useForm({
    defaultValues: {
      email: 'vitala8896@gmail.com'
    }
  })  
  return (
    <StyleForm className="slide-in-top" style={ showPopUpLogin? {display: 'flex'}:{display: 'none'}}>
      <Form onSubmit={handleSubmit(data => {
        dispatch(loginUser({...data}))
        dispatch(showPopUpLoginToggle())
      })              
      }>
        <Header>
          <Title>Login</Title>
          <Close src={close} onClick={()=>dispatch(showPopUpLoginToggle()) }/> 
        </Header>         
        <Input type="email" {...register("email", {required: true, minLength: 4, maxLength: 30, pattern: /^\S+@\S+$/i})} placeholder="Please enter your email."/>
        {errors.email && "min length: 4, maxLength: 30"}
        <Input type="password" {...register("password", {required: true, minLength: 2})} placeholder="Please enter your password."/>
        {errors?.password && "min length: 2"}
        <Button type="submit">Submit</Button>
        <GoTo onClick={()=>{dispatch(showPopUpRegisterToggle())}}>go to register</GoTo>        
      </Form>
    </StyleForm>
  )
}

export { LoginForm }

const StyleForm = styled.div`
  position: fixed;
  top: 0;
  display: none;
  align-items: center;
  justify-content: center; 
  width: 100%;
  height: 100vh; 
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
  width: 320px;
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