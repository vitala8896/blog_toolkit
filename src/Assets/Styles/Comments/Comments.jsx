import styled from 'styled-components'

export const StyleComments = styled.div`
  padding-top: 10px;
  color: rgb(0, 0, 0);
  width: 70%; 
  @media (max-width: 1250px){
    width: 95%;
  }
`;
export const Item = styled.div`
  display: flex;
  align-items: center;
  min-height: 40px;
  :hover .material-icons {
    display: block;
  }
`;
export const Img = styled.div`
  min-width: 50px;  
`;
export const Avatar = styled.img`
  width: 40px;
  height: auto;
  border-radius: 50%;
`;
export const Dell = styled.span`
  display: none; 
  border-radius: 50%;
  transition: all 3.3s ease-in;
  margin-left: 10px;  
`;