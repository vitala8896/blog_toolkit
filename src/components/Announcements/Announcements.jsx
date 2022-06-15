import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import person from './../../Assets/Images/person.svg'
import { Loader } from '../UI/Loader/Loader'
import { setReduxActiveAnnouncement, fetchPostsStart, setReduxAnnouncementsList } from '../../store/postSlice'
import { StyleAnnouncements, Container, Item, Name, Title, Body, ItemHeader, ImgAndName, StyledNavLink, Img, DateItem, H1 } from './../../Assets/Styles/Announcements/Announcements'
import { getReduxAnnouncements } from '../../services/API/post'

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
          <StyledNavLink to={'/announcements/' + item.id} onClick={() => {
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
      <Container>        
        {loading ? <Loader /> : renderList()}
      </Container>
    </StyleAnnouncements>
  )
}
export default Announcements