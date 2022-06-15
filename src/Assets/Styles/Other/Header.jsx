import styled from 'styled-components'
import { NavLink } from 'react-router-dom'


export const StyleHeader = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;  
  background: #313131;
  width: 100%;
  height: 67px;
  z-index: 10;
`;
export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  @media (max-width: 1250px){
    width: 100%
  }
`;
export const Logo = styled.img`
  height: 70px;
  z-index: 100 !important;
  @media (max-width: 450px){
    height: 50px;
  }
`;
export const Avatar = styled.img`
  width: 60px;
  border-radius: 50%;
  @media (max-width: 450px){
    width: 50px;
  }
`;
export const Menu = styled.ul`
  display: flex;
  @media (max-width: 450px){
    :nth-child(1){
      margin-right: 8px;
    }
`;
export const StyledNavLink = styled(NavLink)`
  font-size: 22px;
  text-decoration: none;
  margin-right: 20px;
  color: #2884f6;
  @media (max-width: 450px){
    font-size: 18px;
  }
`;