import styled from 'styled-components'
import TextareaAutosize from 'react-textarea-autosize'


export const Creator = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const NewComment = styled(TextareaAutosize)`
  background: #f5f1f1;
  border-bottom: 1px solid rgb(209, 209, 209);
  border-radius: 5px;
  min-height: 40px;
  padding: 0 15px;
  flex-grow: 1;
  margin: 0 5px;
  resize: none
`;
export const Add = styled.span`
  background: #b3b3b3;
  border-radius: 50%;
  :hover {
    background: #6b6b6b;
    cursor: pointer;
  }
`;