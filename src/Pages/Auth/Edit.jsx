import { useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import styled from 'styled-components'
import { addUserShowToggle } from "../../store/userSlice"
import close from "./../../Assets/Images/close.jpg"
import { loginUser, updateUser } from '../../store/authSlice'


const EditUser = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  let user =  JSON.parse(localStorage.getItem('user'))
  const { register, handleSubmit, formState: { errors },
  } = useForm({
    defaultValues: {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      age: user.age,
      email: user.email,
      avatar: user.avatar,      
    }
  })
  const { addUserShow } = useSelector(state => ({
    addUserShow: state.user.addUserShow
  }))
  return (
    <StyleForm style={ addUserShow? {display: 'flex'}:{display: 'none'}}>
      <Form onSubmit={handleSubmit( async data => {
        await dispatch(updateUser({...data}))
        await dispatch(loginUser({...data}))
        await dispatch(addUserShowToggle())
        return history.push('/')
      })
      }>
        <Header>
          <Title>Edit user</Title>
          <Close src={close} onClick={()=>dispatch(addUserShowToggle())}/> 
        </Header>  
        <Input style={{color: 'gray'}} type="number" {...register("id", {required: true, minLength: 3})} placeholder="id" disabled/>        
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
      </Form>
    </StyleForm>
  )
}

export { EditUser }




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
const Close = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer
`