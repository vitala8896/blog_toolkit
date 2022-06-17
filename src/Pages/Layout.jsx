import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import MenuToggle from './Dashboard/MenuToggle'
import Drawer from './Dashboard/Drawer'

export const Layout = props => {  
  const [state, setState] = useState({
    menu: false, 
    createPost: false
  })
  const { isAuthenticated } = useSelector(
    state => ({
      isAuthenticated: state.auth.isAuthenticated
    })
  )
  const toggleMenuHandler = () => {
    setState({
      menu: !state.menu
    })
  } 
  const menuCloseHandler = () => {
    setState({
      menu: false
    })
  }
  return (
    <StyleLayout>        
      <Drawer
        isOpen={state.menu}
        onClose={menuCloseHandler}
        isAuthenticated={isAuthenticated}
        createPost={state.createPost}
      />
      <MenuToggle
        onToggle={toggleMenuHandler}
        isOpen={state.menu}
      />
      <Main>
        {props.children}
      </Main>
    </StyleLayout>
  )
}  

export default Layout

const StyleLayout = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
const Main = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;