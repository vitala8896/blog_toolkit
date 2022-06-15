import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createControl, validate, validateForm } from '../UI/form/formFramework'
import { Button } from '../UI/Button/Button'
import { Input } from '../UI/Input/Input'
import { Textarea } from '../UI/Textarea/Textarea'
import { Auxiliary } from '../../Pages/Auxiliary'
import { createPost } from '../../store/createSlice'
import { Creator, Header, Form } from '../../Assets/Styles/Posts/Creator'
import { finishCreatePost } from '../../services/API/create'


const createFormControl = () => {
  return {
    postName: createControl({
      label: 'Post title',
      errorMessage: 'The field cannot be empty',
      validation: {
        required: true,
        minLength: 6
      }
    }, { required: true }),
    description: createOptionControl(1)
  }
}
const createOptionControl = number => {
  return createControl({
    label: 'Description',
    errorMessage: 'The field cannot be empty',
    id: number,
    validation: {
      required: true,
      minLength: 6
    }
  }, { required: true })
}
const PostCreator = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  const [state, setState] = useState({
    isFormValid: false,
    formControls: createFormControl()
  })  
  const submitHandler = e => {
    e.preventDefault()    
  }
  const createPostHandler = async e => {
    e.preventDefault()   
    const { postName, description } = state.formControls
    const postItem = {
      title: postName.value,
      body: description.value,
      userId: JSON.parse(localStorage.getItem('user')).id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    dispatch(createPost(postItem))
    setState(prevState => {
      return {...prevState, isFormValid: !postItem.title,
      formControls: createFormControl()
    }})
    await dispatch(finishCreatePost())
    return history.push('/')
  }
  const changeHandler = (value, controlName) => {
    const formControls = { ...state.formControls }
    const control = { ...formControls[controlName] }
    control.touched = true
    control.value = value
    control.valid = validate(control.value, control.validation)
    formControls[controlName] = control
    setState(prevState => {
      return {...prevState, formControls,
      isFormValid: validateForm(formControls)
    }})
  }
  const renderControls = () => {
    return Object.keys(state.formControls).map(
      (controlName, index) => {
        const control = state.formControls[controlName]
        return (
          <Auxiliary key={controlName + index}>
            {controlName !== 'description'?
              <Input
                label={control.label}
                value={control.value}
                valid={control.valid}
                shouldValidate={!!control.validation}
                touched={control.touched}
                errorMessage={control.errorMessage}
                onChange={e => changeHandler(e.target.value, controlName)}
              /> :
              <Textarea
                label={control.label}
                value={control.value}
                valid={control.valid}
                shouldValidate={!!control.validation}
                touched={control.touched}
                errorMessage={control.errorMessage}
                onChange={e => changeHandler(e.target.value, controlName)}
              />
            }
          </Auxiliary>
        )
      })
  }
  return (      
    <Creator>
        <Header>Create a post</Header>
        <Form onSubmit={submitHandler}>
          {renderControls()}
          <Button success onClick={createPostHandler
          } disabled={!state.isFormValid}>Create a post</Button>
      </Form>
    </Creator>
  )
}



export default PostCreator