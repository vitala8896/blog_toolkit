import { useSelector, useDispatch } from 'react-redux'
import { StyleHeader, Container, Logo, Avatar, Menu, StyledNavLink } from '../Assets/Styles/Other/Header'
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
