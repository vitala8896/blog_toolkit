import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
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

const StyleDrawer = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 300px;
  padding: 20px 20px;
  box-sizing: border-box;
  transform: translateX(0px);
  transition: transform .22s ease-in;
  z-index: 90;
  background: #ebf0ff;
  &.close {
    transform: translateX(-300px)
  }
`;
const Item = styled.div`
  padding-bottom: 10px;
  hr {
    margin-top: 20px
  }
`;
const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 60px 0 0;
`;
const StyledNavLink = styled(NavLink)`
  position: relative; 
  color: #363d54;
  font-size: 24px;
  text-decoration: none;
  background: #ebf0ff;
  line-height: 1;
  transition: opacity .3s;
  cursor: pointer;
  margin-bottom: 30px;
  :hover {
    color: #2884f6;
  };
  &.active {
    opacity: .7;
  }  
`;