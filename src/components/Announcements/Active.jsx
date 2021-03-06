import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { setReduxActiveAnnouncement, addEditAnnouncementShowToggle } from '../../store/postSlice'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { getActiveAnnouncement } from './../../services/API/post'
import { finishDeleteAnnouncement } from './../../services/API/create'
import { EditAnnouncement } from './Edit'
import TextareaAutosize from 'react-textarea-autosize'


const ActiveAnnouncement = () => {
  const dispatch = useDispatch()
  let history = useHistory()

  const { activeAnnouncement, activeAnnouncementItem, addEditShow, createAnnouncement } =
  useSelector( state => ({
    activeAnnouncement: state.post.announcements.activeAnnouncement,
    activeAnnouncementItem: state.post.announcements.activeAnnouncementItem,
    addEditShow: state.post.announcements.addEditShow,
    createAnnouncement: state.create.announcement,
  }))

  useEffect( () => {    
    const setURL = () => {
      let numURL = +history.location.pathname.replace('/announcements/', '')
      dispatch(setReduxActiveAnnouncement(numURL))
      return numURL
    } 
    let thisURL = activeAnnouncement === 0? setURL() : activeAnnouncement  
    dispatch(getActiveAnnouncement(thisURL))
  }, [createAnnouncement])  

  const dellAnnouncement = () => {    
    dispatch(finishDeleteAnnouncement(activeAnnouncement))
    return history.push('/announcements')
  }
  const isAuth = () => {
    if(localStorage.getItem('user')){
      return activeAnnouncementItem.userId === JSON.parse(localStorage.getItem('user')).id
    }else{
      return false
    }    
  }  
  const render = () => {
    if (activeAnnouncementItem.id) {
      return (
        <Container>
          <Header>
            <StyledNavLink to={'/announcements'}>
              <Name> 
              {activeAnnouncementItem.user.firstname} {activeAnnouncementItem.user.lastname}</Name>
            </StyledNavLink>
            {isAuth() &&
              <Icon className="material-icons" onClick={() => {
                dispatch(addEditAnnouncementShowToggle())
                history.push(`/announcements/${activeAnnouncement}`) }}>edit</Icon>
            }
          </Header>
          <H1>{activeAnnouncementItem.title}</H1>
          <Body value={activeAnnouncementItem.body}/>
        </Container>
      ) 
    }    
  }
  return (
    <Active>
      {addEditShow && <EditAnnouncement/>}
      {render()}
    </Active>
  )
}
export default ActiveAnnouncement

const Active = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 90px 0 50px;
  width: 100%;
  height: auto;
  color: #fff; 
  cursor: pointer;
`;
const Container = styled.div`
  width: 70%;
  height: auto;
  border: 1px solid rgb(129, 129, 129);
  border-radius: 5px;
  background: linear-gradient(90deg, #5041b2 0%, #7969e6 100%);
  padding: 20px;
  @media (max-width: 1250px){
    width: 95%
  }
`;
const H1 = styled.h1`
  font-size: 20px;
  margin-left: 10px;
`;
const Icon = styled.span`
  color: #fff; 
  border-radius: 50%;
  padding: 8px;
  height: 40px;
  :hover {
    background: rgb(8, 9, 63);
    transition: all .6s ease-in;
  }
`;
const Header = styled.div`
  display: flex;
  padding: 10px 15px 0;
  border-radius: 5px;
  background: linear-gradient(90deg, #000 0%, #7969e6 100%);
`;
const Name = styled.p`
  color: white;
  font-size: 24px;
  padding-bottom: 15px;
  :hover {
    color: rgb(167, 167, 167);
  }
`;
const Body = styled(TextareaAutosize)`
  background: linear-gradient(90deg, #5041b2 0%, #7969e6 100%);
  width: 100%; 
  height: auto; 
  resize: none;
`;
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;