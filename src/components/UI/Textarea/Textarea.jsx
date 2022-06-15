import { StyleTextarea, TextareaSize } from './../../../Assets/Styles/Other/Textarea'

export const Textarea = props => {
  const isInvalid = ({valid, touched, shouldValidate}) => {
    return !valid && shouldValidate && touched
  }
  const textareaType = props.type || 'text'
  const cls = ['Textarea']
  const htmlFor = `${textareaType}-${Math.random()}`
  if (isInvalid(props)) {
    cls.push('invalid')
  }
 return (
   <StyleTextarea className={cls.join(' ')}>
     <label htmlFor={htmlFor}>{props.label}</label>
     <TextareaSize type={textareaType} id={htmlFor}
       value={props.value} onChange={props.onChange} />
     {isInvalid(props)
       && <span>{props.errorMessage || 'Enter the correct value'}</span>}     
   </StyleTextarea>
 )
}