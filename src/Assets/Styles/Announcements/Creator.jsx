import styled from 'styled-components'

export const Creator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;
  width: 100%;
  height: 100%;
  background: #cbe2ff;
`;
export const Header = styled.h1`
  margin: 0;
  font-size: 30px;
  font-weight: bold;
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  @media (max-width: 768px){    
      width: 90%;    
  }
`;