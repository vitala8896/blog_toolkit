import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import TextareaAutosize from 'react-textarea-autosize'


export const EditPost = styled.div`
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
export const Header = styled.div`
  display: flex;
  justify-content: space-between;  
`;
export const Name = styled.p`
  color: white;
  :hover {
    color: rgb(167, 167, 167);
  }
`;
export const Title = styled.input`
  background: #7969e6;
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 15px;
  
`;
export const Body = styled(TextareaAutosize)`
  margin: 0;
  background: #7969e6;
  width: 100%;
  padding: 10px 15px;
  resize: none
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
export const Dell = styled.span`
  display: flex;
  justify-content: flex-end;  
`;
export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;