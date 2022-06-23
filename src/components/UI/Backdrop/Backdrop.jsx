import styled from 'styled-components'

export const Backdrop = props => <StyleBackdrop onClick={props.onClick} /> 

const StyleBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #2884F6;
  opacity: 0.3;
  z-index: 50; 
`;