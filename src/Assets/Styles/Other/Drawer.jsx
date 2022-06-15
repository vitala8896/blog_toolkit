import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const StyleDrawer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 300px;
  padding: 20px 20px;
  box-sizing: border-box;
  transform: translateX(0px);
  transition: transform .22s ease-in;
  z-index: 90;
  background: #ebf0ff;
  &.close {
    transform: translateX(-300px)
  }
`;
export const Item = styled.div`
  padding-bottom: 10px;
  hr {
    margin-top: 20px
  }
`;
export const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 60px 0 0;
`;
export const StyledNavLink = styled(NavLink)`
  position: relative; 
  color: #363d54;
  font-size: 24px;
  text-decoration: none;
  background: #ebf0ff;
  line-height: 1;
  transition: opacity .3s;
  cursor: pointer;
  margin-bottom: 30px;
  :hover {
    color: #2884f6;
  };
  &.active {
    opacity: .7;
  }  
`;