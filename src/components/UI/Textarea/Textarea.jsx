import styled from 'styled-components'
import TextareaAutosize from 'react-textarea-autosize'

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

const StyleTextarea = styled.div`
  margin-bottom: 10px;
  label {
    display: block;
    font-weight: bold;
  };
  span {
    color: #f01f30;
    font-size: 12px;
    font-weight: bold;
  };
  .invalid label {
    color: #f01f30;
  }  
`;
const TextareaSize = styled(TextareaAutosize)`
   display: block;
    box-sizing: border-box;
    background: #f5f1f1;
    border-bottom: 1px solid rgb(209, 209, 209);
    padding: 0 7px;
    width: 500px;
    min-height: 150px;
    max-height: 450px;
    outline: none;
    resize: none;
    transition: all 300ms ease-in-out;
    @media (max-width: 768px){
      width: 100%;
    }
`;