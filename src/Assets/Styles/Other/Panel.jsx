import styled from 'styled-components'

export const StylePanel = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  align-items: center;
  margin-top: 62px;
  height: 45px;
  cursor: pointer;
  z-index: 1;
`;
export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 68%;
  @media (max-width: 1250px){
      width: 98%
  }
`;
export const Num = styled.span`
  padding: 0 10px 0;
  &.selectedPage {
    font-weight: bold;
    font-size: 20px;
    background: #ececec;
  }
`;
export const Pagination = styled.div`
  background: white;
  padding: 3px;
  border-radius: 5px;
  width: auto
`;