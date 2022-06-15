import { useSelector } from 'react-redux'
import { StyleDrawer, Item, List, StyledNavLink } from '../../Assets/Styles/Other/Drawer'
import { Backdrop } from '../../components/UI/Backdrop/Backdrop'



const Drawer = props => {
  const { isAuthenticated } = useSelector(state => ({
		isAuthenticated: state.auth.isAuthenticated
  }))
  
  const clickHandler = () => {
    props.onClose()
  }  
  const renderLinks = links => {
    return links.map((link, index) => {
      return (
        <Item key={index}>
          <StyledNavLink
            to={link.to}
            exact={link.exact}
            activeClassName={StyleDrawer.active}
            onClick={clickHandler}
          >
            {link.label}
          </StyledNavLink>
          {index % 2? <hr/>:''}
        </Item>
      )
    })
  }
  
  const cls = ['Drawer']
  if (!props.isOpen) {
    cls.push('close')
  }  
  const links = [
    { to: '/', label: 'Posts', exact: true },
    { to: '/announcements', label: 'Announcements', exact: true }
  ]
  if (isAuthenticated) {
    links.push(
      { to: '/post-creator', label: 'Create a post', exact: false },
      { to: '/announcement-creator', label: 'Create a announcement', exact: false },
      { to: '/logout', label: 'Exit', exact: false })
  } else {
    links.push({ to: '/auth/login', label: 'Authorization', exact: false })
  }
  return (
    <div>  
      <StyleDrawer className={cls.join(' ')}>
        <List>
          {renderLinks(links)}
        </List>
      </StyleDrawer>
      {props.isOpen && <Backdrop onClick={props.onClose} />}
    </div>
  )
}

export default Drawer