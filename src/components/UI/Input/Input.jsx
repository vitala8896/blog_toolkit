import styled from 'styled-components'

export const Input = props => {
  const isInvalid = ({ valid, touched, shouldValidate }) => {
    return !valid && shouldValidate && touched
  }
  const inputType = props.type || 'text'
  const cls = ['Input']
  const htmlFor = `${inputType}-${Math.random()}`
  if (isInvalid(props)) {
    cls.push('invalid')
  }
  return (
    <StyleInput className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input type={inputType} id={htmlFor}
        value={props.value} onChange={props.onChange} />
      {isInvalid(props)
        && <span>{props.errorMessage || 'Enter the correct value'}</span>}
    </StyleInput>
  )
}

export const StyleInput = styled.div`
  margin-bottom: 10px;
  label {
    display: block;
    font-weight: bold;
  };
  input {
    display: block;
    box-sizing: border-box;
    padding: 0 7px;
    background: #f5f1f1;
    border-bottom: 1px solid rgb(209, 209, 209);
    height: 40px;
    width: 100%;
    outline: none;
    transition: all 300ms ease-in-out;
  }
  span {
    color: #f01f30;
    font-size: 12px;
    font-weight: bold;
  }
  .invalid label {
    color: #f01f30;
  }
`;
