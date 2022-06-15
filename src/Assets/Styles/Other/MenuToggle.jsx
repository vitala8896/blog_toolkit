import styled from 'styled-components'

export const Menu = styled.div`
  position: fixed;
  top: 21px;
  left: 80px;
  font-size: 25px;
  cursor: pointer;
  color: #2884f6;
  transition: opacity, left .22s ease-in;
  z-index: 100;  
  &.open {
    left: 260px;
  }
  :hover {
    opacity: .7;
  };  
  @media (max-width: 1250px){
      left: 80px;
  }
  @media (max-width: 450px){
      left: 50px;
      font-size: 20px;
  } 
`;
