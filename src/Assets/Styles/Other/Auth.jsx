import styled from 'styled-components'

export const StyleAuth = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 100px;
  width: 100%;
  height: 100vh;
  background:rgba(0, 74, 158, 0.2);
`;
export const AuthForm = styled.form`
  background: #eee;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, .5);
  padding: 15px;
  border-radius: 5px;
`;
export const GoTo = styled.a`
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
  text-decoration: none;
  :hover {
    color: #222;
  }
`;
export const H1 = styled.h1`
  color: #fff;
  text-align: center;
`;
export const Btn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`; 
export const AuthWidth = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 0 20px;
`; 