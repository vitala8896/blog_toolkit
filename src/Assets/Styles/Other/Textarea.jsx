import styled from 'styled-components'
import TextareaAutosize from 'react-textarea-autosize'


export const StyleTextarea = styled.div`
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
export const TextareaSize = styled(TextareaAutosize)`
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


