import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { setReduxPageNumPosts } from '../store/postSlice'
import logo from './../Assets/Images/blog-logo.png'

const Header = () => {
  const dispatch = useDispatch()
  const { avatar, accessToken } = useSelector(state => ({
    avatar: state.post.avatarURL,
    accessToken: state.auth.accessToken
  }))
  const goToStartPage = () => {
    dispatch(setReduxPageNumPosts(1))
  }
  return (
    <StyleHeader>
      <Container>
        <StyledNavLink to='/'><Logo src={logo}  alt="logo" onClick={ goToStartPage } />
        </StyledNavLink>
        <Menu>
          <StyledNavLink to='/' onClick={ goToStartPage }
          >Posts</StyledNavLink>          
          <StyledNavLink to='/announcements'
          >Announcements</StyledNavLink>          
        </Menu>
        {accessToken &&
          <StyledNavLink to='/'><Avatar src={avatar} alt="logo" onClick={goToStartPage} />
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
  background: #313131;
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
  z-index: 100 !important;
  @media (max-width: 450px){
    height: 50px;
  }
`;
const Avatar = styled.img`
  width: 60px;
  border-radius: 50%;
  @media (max-width: 450px){
    width: 50px;
  }
`;
const Menu = styled.ul`
  display: flex;
  @media (max-width: 450px){
    :nth-child(1){
      margin-right: 8px;
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