import styled from 'styled-components'


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
