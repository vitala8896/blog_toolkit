import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding-bottom: 15px;
  margin: 75px 0 15px;
  @media(max-width: 768px){
    flex-direction: column;  
    align-items: center
  }
  @media(max-width: 450px){
      margin: 100px 0 15px
  }
`;
export const StyleTitle = styled.h1`
  margin: 0;
  font-size: 30px;
  font-weight: bold;
`;
export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: flex-start;
  width: 70%;
  @media (max-width: 1250px){  
    width: 100%
  }
`;
export const Item = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;
  height: 220px;
  padding: 5px 15px 10px;
  margin-top: 15px;
  overflow: hidden;  
  border-radius: 3px;
  border: 1px solid rgb(233, 233, 233);
  cursor: pointer;
  :hover {
    border: 1px solid white;
    box-shadow: 1px 1px 20px  #e6e6e6;
  }
  @media(max-width: 768px){
    width: 90%;
    height: 220px;
  }
`;
export const Name = styled.div`
  margin: 0;
  color: black; 
  line-height: 1.4;
  font-weight: bold;
  font-size: 20px;
`;
export const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Img = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  width: 50px;
  margin-right: 10px;
  img {
    width: 100%;
    height: auto;
  }
`;
export const DateItem = styled.div`
  padding-top: 6px;
  font-size: 12px;
  color: black; 
`;
export const Title = styled.div`
  font-weight: bold;
  font-size: 20px;  
  color: #2884F6 !important;
  line-height: 20px !important;
  padding-bottom: 3px;
`;
export const Body = styled.div`
  height: 100%;
  color: black; 
`;
export const ImgAndName = styled.div`
  display: flex;
  align-items: center;
`;
export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;