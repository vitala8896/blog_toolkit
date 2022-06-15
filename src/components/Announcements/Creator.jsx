import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { createControl, validate, validateForm } from '../UI/form/formFramework'
import { Button } from '../UI/Button/Button'
import { Input } from '../UI/Input/Input'
import { Textarea } from '../UI/Textarea/Textarea'
import { Auxiliary } from '../../Pages/Auxiliary'
import { createAnnouncement } from '../../store/createSlice'
import styled from 'styled-components'
import { finishCreateAnnouncement } from '../../services/API/create'

const createFormControl = () => {
  return {
    postName: createControl({
      label: 'Announcement title',
      errorMessage: 'The field cannot be empty'
    }, { required: true }),
    description: createOptionControl(1)
  }
}
const createOptionControl = number => {
  return createControl({
    label: 'Description',
    errorMessage: 'The field cannot be empty',
    id: number
  }, { required: true })
}
const AnnouncementCreator = () => {
  const dispatch = useDispatch()
  let history = useHistory()
  const [state, setState] = useState({
    isFormValid: false,
    formControls: createFormControl()
  })
  const submitHandler = event => {
    event.preventDefault()
  }
  const createAnnouncementHandler = async e => {
    e.preventDefault()
    const { postName, description } = state.formControls
    const postItem = {
      title: postName.value,
      body: description.value,
      userId: JSON.parse(localStorage.getItem('user')).id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    dispatch(createAnnouncement(postItem))
    setState( prevState => {
      return {
        ...prevState, isFormValid: false,
        formControls: createFormControl()
      }
    })
    await dispatch(finishCreateAnnouncement())
    return history.push('/announcements')
  }
  const changeHandler = (value, controlName) => {
    const formControls = { ...state.formControls }
    const control = { ...formControls[controlName] }
    control.touched = true
    control.value = value
    control.valid = validate(control.value, control.validation)
    formControls[controlName] = control
    setState(prevState => {
      return {
        ...prevState, formControls,
        isFormValid: validateForm(formControls)
      }
    })
  }
  const renderControls = () => {
    return Object.keys(state.formControls).map(
      (controlName, index) => {
        const control = state.formControls[controlName]
        return (
          <Auxiliary key={controlName + index}>
            {controlName !== 'description' ?
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
      <Header>Create a announcement</Header>
      <Form onSubmit={submitHandler}>
        {renderControls()}
        <Button type="success" onClick={createAnnouncementHandler} disabled={!state.isFormValid}>Create a announcement</Button>
      </Form>
    </Creator>
  )
}

export default AnnouncementCreator

const Creator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
  width: 100%;
  height: 100%;
  background: #cbe2ff;
`;
const Header = styled.h1`
  margin: 0;
  font-size: 30px;
  font-weight: bold;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  @media (max-width: 768px){    
      width: 90%;    
  }
`;