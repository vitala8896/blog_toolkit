import { useState } from 'react'
import { useSelector } from 'react-redux'
import { StyleLayout, Main } from '../Assets/Styles/Other/Layout' 
import MenuToggle from './Dashboard/MenuToggle'
import Drawer from './Dashboard/Drawer'

export const Layout = props => {
  const [state, setState] = useState({
    menu: false
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