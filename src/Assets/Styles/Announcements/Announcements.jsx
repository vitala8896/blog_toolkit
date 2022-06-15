import styled from 'styled-components'
import { NavLink } from 'react-router-dom'


export const StyleAnnouncements = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 75px;
`;
export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: flex-start;
  width: 70%;
  min-height: 90vh;
  padding-bottom: 15px;
  @media (max-width: 1250px){
    width: 100%
  }
`;
export const Item = styled.div`
  display: flex;  
  flex-direction: column;
  height: 148px;
  width: 48%;
  padding: 0 10px 10px;
  margin-top: 15px;
  overflow: hidden;  
  border-radius: 3px;
  border: 1px solid rgb(219, 219, 219);
  cursor: pointer;
  :hover {
    border: 1px solid white;
    box-shadow: 1px 1px 20px  #6d6d6d;  
  }
  @media(max-width: 768px){
    width: 98%;
  }
`;
export const H1 = styled.h1`
  margin: 0;
  font-size: 30px;
  font-weight: bold;
`;
export const Name = styled.p`
  font-weight: bold;
  font-size: 20px;
  margin: 0;
  color: black; 
  line-height: 1.4;
`;
export const Title = styled.p`
  font-weight: bold;
  font-size: 20px;  
  color: #2884F6 !important;
  line-height: 20px !important;
  padding-bottom: 3px;
  margin: 0;
  color: black; 
  line-height: 1.4;
`;
export const Body = styled.p`
  height: 100%;
  margin: 0;
  color: black; 
  line-height: 1.4;  
`;
export const DateItem = styled.p`
  margin: 0;
  color: black; 
  line-height: 1.4; 
  font-size: 12px;
`;
export const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; 
`;
export const ImgAndName = styled.div`
  display: flex;
  align-items: center;
`;
export const Img = styled.img`
  width: 50px;
  height: 55px;
  margin-right: 5px;
`;
export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;