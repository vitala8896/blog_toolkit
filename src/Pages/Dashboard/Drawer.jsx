import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { Backdrop } from '../../components/UI/Backdrop/Backdrop'
import { addPostShowToggle, addAnnouncementShowToggle } from '../../store/postSlice'



const Drawer = props => {
  const dispatch = useDispatch()
  const { isAuthenticated } = useSelector(state => ({
		isAuthenticated: state.auth.isAuthenticated
  }))  
  const clickHandler = link => {
    props.onClose()
    link === 'Create a post' && 
    dispatch(addPostShowToggle())
    link === 'Create a announcement' && 
    dispatch(addAnnouncementShowToggle())
  }  
  const renderLinks = links => {
    return links.map((link, index) => {
      return (
        <Item key={index}>
          <StyledNavLink
            to={link.to}
            exact={link.exact}
            activeClassName={StyleDrawer.active}
            onClick={() => clickHandler(link.label)}
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
      { to: '/', label: 'Create a post', exact: false },
      { to: '/announcements', label: 'Create a announcement', exact: true },
      { to: '/logout', label: 'Exit', exact: false })
  } else { 
    let checkAuth = () => {
      if(localStorage.getItem('user')){
        return 'login'
      }else{
        return 'register'
      }
    }   
    links.push({ to: `/auth/${checkAuth()}`, label: 'Authorization', exact: false })
  }
  return (
    <>  
      <StyleDrawer className={cls.join(' ')}>
        <List>
          {renderLinks(links)}
        </List>
      </StyleDrawer>
      {props.isOpen && <Backdrop onClick={props.onClose} />}
    </>
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
    margin-top: 20px;
  }
`;
const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 60px 0 0;
`;
const StyledNavLink = styled(NavLink)`
  background-image: linear-gradient(
    to right,
    #54b3d6,
    #54b3d6 50%,
    #000 50%
  );
  background-size: 200% 100%;
  background-position: -100%;
  display: inline-block;
  padding: 5px 0;
  position: relative;
  font-size: 20px;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.3s ease-in-out;
  :before{
    content: '';
    background: #54b3d6;
    display: block;
    position: absolute;
    bottom: -3px;
    left: 0;
    width: 0;
    height: 3px;
    transition: all 0.3s ease-in-out;
  };
  :hover {
    background-position: 0;
  };
  :hover::before{
    width: 100%;
  }
  &.active {
    opacity: .7;
  }  
`;