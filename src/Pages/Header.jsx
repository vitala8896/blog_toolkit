import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { setReduxPageNumPosts } from '../store/postSlice'
import logo from './../Assets/Images/blog-logo.png'
import { EditUser } from './Auth/Edit'
import { addUserShowToggle } from '../store/userSlice'

const Header = () => {
  const dispatch = useDispatch()
  const { avatar, accessToken, addUserShow } = useSelector(state => ({
    avatar: state.post.avatarURL,
    accessToken: state.auth.accessToken,
    addUserShow: state.user.addUserShow
  }))
  const goToStartPage = () => {
    dispatch(setReduxPageNumPosts(1))
  }
  return (
    <StyleHeader>
      {addUserShow && <EditUser/>}
      <Container>
        <StyledNavLink to='/'><Logo src={logo}  alt="logo" onClick={ goToStartPage } />
        </StyledNavLink>
        <Menu>
          <SNavLink to='/' onClick={ goToStartPage }
          >Posts</SNavLink>          
          <SNavLink to='/announcements'
          >Announcements</SNavLink>          
        </Menu>
        {accessToken &&
          <StyledNavLink to='/'><Avatar src={avatar} alt="logo" onClick={() => {dispatch(addUserShowToggle())}} />
          </StyledNavLink>}
      </Container>
    </StyleHeader>
  )
}
export default Header

const StyleHeader = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;  
  background: linear-gradient(90deg, #111 0%, #7969e6 180%);
  width: 100%;
  height: 67px;
  z-index: 10;
`;
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  @media (max-width: 1250px){
    width: 100%
  }
`;
const Logo = styled.img`
  height: 70px;
  z-index: 100;
  @media (max-width: 450px){
    height: 50px;
  }
  @media (max-width: 320px){
    display: none;
  }
`;
const Avatar = styled.img`
  width: 60px;
  border-radius: 50%;
  @media (max-width: 450px){
    width: 50px;
  }
  @media (max-width: 320px){
    width: 30px;
  }
`;
const Menu = styled.ul`
  display: flex;
  @media (max-width: 450px){
    :nth-child(1){
      margin-right: 8px;
  }
`;
const SNavLink = styled(NavLink)`
  background-image: linear-gradient(
    to right,
    #54b3d6,
    #54b3d6 50%,
    #2884f6 0%
  );
  background-size: 200% 100%;
  background-position: -100%;
  display: inline-block;
  padding: 0 15px;
  position: relative;
  font-size: 22px;
  font-weight: bold;
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
    opacity: .7;
  };
  :hover::before{
    width: 100%;
  }
  &.active {
    opacity: 1;
  }  
  @media (max-width: 450px){
    font-size: 18px;
    padding: 0 5px;
  }
`;
const StyledNavLink = styled(NavLink)`
  font-size: 22px;
  text-decoration: none;
  margin-right: 20px;
  color: #2884f6;
  @media (max-width: 450px){
    font-size: 18px;
  }
`;