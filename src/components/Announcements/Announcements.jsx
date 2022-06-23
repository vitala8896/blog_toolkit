import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import person from './../../Assets/Images/person.svg'
import { Loader } from '../UI/Loader/Loader'
import { setReduxActiveAnnouncement, fetchStart, setReduxAnnouncementsList } from '../../store/postSlice'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import { getReduxAnnouncements } from '../../services/API/post'
import { CreateAnnouncement } from './Create'

const Announcements = () => {
  const dispatch = useDispatch()
  const { announcements, list, loading, pageNum, pageSize } = useSelector(state => ({
    announcements: state.post.announcements.announcements,
    list: state.post.pagination.announcements.list,
    loading: state.post.loading,
    pageNum: state.post.pagination.announcements.pageNum,
    pageSize: state.post.pagination.announcements.pageSize,
  }))
  useEffect(() => {    
    dispatch(fetchStart()) 
    dispatch(getReduxAnnouncements(pageNum, pageSize))
  }, [pageNum])  
  useEffect(() => {
    if (announcements?.length) {
      const list = announcements.map(item => {
        return {
          id: item.id,
          name: item.user.firstname,
          surname: item.user.lastname,
          avatar: '',
          title: item.title,
          body: item.body,
          create: item.createdAt,
        }
      })
      dispatch(setReduxAnnouncementsList(list))
    }
  }, [announcements])

  const renderList = () => {
    return list.map((item, key) => {
      return (
        <Item key={key}>
          <StyledNavLink to={`/announcements/${item.id}`} onClick={() => {
            dispatch(setReduxActiveAnnouncement(item.id))
          }}>
            <ItemHeader>
              <ImgAndName>
                <Img src={person} alt='' />
                <Name>
                  {item.name} {item.surname}
                </Name>
              </ImgAndName>
              <DateItem>{new Date(item.create).toLocaleDateString('')}</DateItem>
            </ItemHeader>
            <Title>{item.title}</Title>
            <Body>{item.body.substr(0, 600)}</Body>
          </StyledNavLink>
        </Item>
      )
    })
  }
  return (
    <StyleAnnouncements>
      <H1>Announcements</H1>
      <CreateAnnouncement/>
      <Container>        
        {loading ? <Loader /> : renderList()}
      </Container>
    </StyleAnnouncements>
  )
}
export default Announcements

const StyleAnnouncements = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 95px;
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: flex-start;
  width: 70%;
  min-height: 90vh;
  padding-bottom: 15px;
  @media (max-width: 1250px){
    width: 100%
  }
`;
const Item = styled.div`
  display: flex;  
  flex-direction: column;
  height: 148px;
  width: 48%;
  padding: 0 10px 10px;
  margin-top: 15px;
  word-wrap: break-word;
  overflow: hidden;  
  border-radius: 3px;
  border: 1px solid rgb(219, 219, 219);
  cursor: pointer;
  :hover {
    border: 1px solid white;
    box-shadow: 1px 1px 20px  #6d6d6d;  
  }
  @media(max-width: 768px){
    width: 98%;
  }
`;
const H1 = styled.h1`
  margin: 0;
  font-size: 30px;
  font-weight: bold;
`;
const Name = styled.p`
  font-weight: bold;
  font-size: 20px;
  margin: 0;
  color: black; 
  line-height: 1.4;
`;
const Title = styled.p`
  font-weight: bold;
  font-size: 20px;  
  color: #2884F6 !important;
  line-height: 20px !important;
  padding-bottom: 3px;
  margin: 0;
  color: black; 
  line-height: 1.4;
`;
const Body = styled.p`
  height: 100%;
  margin: 0;
  color: black; 
  line-height: 1.4;  
`;
const DateItem = styled.p`
  margin: 0;
  color: black; 
  line-height: 1.4; 
  font-size: 12px;
`;
const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center; 
`;
const ImgAndName = styled.div`
  display: flex;
  align-items: center;
`;
const Img = styled.img`
  width: 50px;
  height: 55px;
  margin-right: 5px;
`;
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;