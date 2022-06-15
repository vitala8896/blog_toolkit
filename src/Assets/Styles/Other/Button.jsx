import styled from 'styled-components'

export const StyleButton = styled.button`
  display: inline-block;
  padding: 10px 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
  color: #000;
  text-transform: uppercase;
  font-weight: bold;
  align-items: center;
  font-size: 12px;
  background: ${props => props.success ? "#ccc" : "rgba(161,240,69,1)"};
  :hover {
    box-shadow: 2px 2px 2px rgba(0,0,0,.3);
  }
  :focus {
    outline: none;
  }
  :active {
    box-shadow: inset 2px 2px 1px rgba(0,0,0,.3);
  }
  :disabled {
    background: #ccc;
    color: #000;
    cursor: not-allowed;
  }
`;


// .error {
//   background: rgba(240,87,108,1)
// }
// .primary {
//   background: #2884f6;
//   color: #fff;
// }