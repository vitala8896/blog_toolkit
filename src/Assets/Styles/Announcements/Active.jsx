import styled from 'styled-components'
import { NavLink } from 'react-router-dom'


export const Active = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 90px 0 50px;
  width: 100%;
  height: auto;
  color: #fff; 
  cursor: pointer;
`;
export const Container = styled.div`
  width: 70%;
  height: auto;
  border: 1px solid rgb(129, 129, 129);
  border-radius: 5px;
  background: linear-gradient(90deg, #5041b2 0%, #7969e6 100%);
  padding: 20px;
  @media (max-width: 1250px){
    width: 95%
  }
`;
export const H1 = styled.h1`
  margin-left: 10px;
`;
export const Icon = styled.span`
  color: #fff; 
  border-radius: 50%;
  padding: 8px;
  :hover {
    background: rgb(8, 9, 63);
    transition: all .6s ease-in;
  }
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Name = styled.p`
  color: white;
  font-size: 24px;
  padding-bottom: 15px;
  :hover {
    color: rgb(167, 167, 167);
  }
`;
export const Body = styled.p`
  margin: 0;
`;
export const Dell = styled.p`
  display: flex;
  justify-content: flex-end;
`;
export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;