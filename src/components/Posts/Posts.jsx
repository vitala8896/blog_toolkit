import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import person from './../../Assets/Images/person.svg'
import { Loader } from '../UI/Loader/Loader'
import { setReduxPostsList, setReduxActivePost, fetchStart } from '../../store/postSlice'
import { getReduxPosts } from './../../services/API/post'
import { getUser } from './../../services/API/user'
import styled from 'styled-components'
import { CreatePost } from './Create'


const Posts = () => {
  const dispatch = useDispatch()
  const { posts, list, loading, pageNum, pageSize } = useSelector(state => ({
    list: state.post.pagination.posts.list,
    loading: state.post.loading,
    pageNum: state.post.pagination.posts.pageNum,
    pageSize: state.post.pagination.posts.pageSize,
    posts: state.post.posts.posts
  }))
  useEffect( () => { 
    dispatch(fetchStart())  
    dispatch(getReduxPosts(pageNum, pageSize))
  }, [pageNum])  
  
  useEffect(() => {        
    if (posts?.length) {
      if(localStorage.getItem('user')) {     
        getUser(JSON.parse(localStorage.getItem('user')).id)
      }
      const list = posts.map(item => {
        return {
          id: item.id,
          name: item.user.firstname,
          surname: item.user.lastname,
          avatar: '',
          title: item.title,
          body: item.body,
          create: new Date(item.createdAt).toLocaleDateString()
        }
      })
      dispatch(setReduxPostsList(list))
    }
  }, [posts])
 
  const renderList = () => {     
    return list.map(item => {
      return (
        <Item key={item.id}>
          <StyledNavLink
            to={'/posts/' + item.id}
            onClick={() => {
              dispatch(setReduxActivePost(item.id));
            }}            
          >
            <ItemHeader>
              <ImgAndName>
                <Img>
                  <img src={item.avatar ? item.avatar : person} alt='' />
                </Img>
                <Name>
                  {item.name} {item.surname}
                </Name>
              </ImgAndName>
              <DateItem>{item.create}</DateItem>
            </ItemHeader>
            <Title>{item.title}</Title>
            <Body>
              {item.body.substr(0, 230) + (item.body.length > 230 ? '...' : '')}
            </Body>
          </StyledNavLink>
        </Item>
      )
    })
  }
  return (
    <div>     
      <List>
        <StyleTitle>Posts</StyleTitle>
        <CreatePost/>        
        <Container>
          {loading ? <Loader /> : renderList()}          
        </Container>
      </List>
    </div>
  )
}
export {Posts}

const List = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding-bottom: 15px;
  margin: 75px 0 15px;  
  @media(max-width: 768px){
    flex-direction: column;  
    align-items: center
  }
  @media(max-width: 450px){
      margin: 100px 0 15px
  }
`;
const StyleTitle = styled.h1`
  margin: 0;
  font-size: 30px;
  font-weight: bold;
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: flex-start;
  min-height: 2350px;
  width: 70%;
  @media (max-width: 1250px){  
    width: 100%
  }
`;
const Item = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;
  height: 220px;
  padding: 5px 15px 10px;
  margin-top: 15px;
  overflow: hidden;  
  border-radius: 3px;
  border: 1px solid rgb(233, 233, 233);
  cursor: pointer;
  :hover {
    border: 1px solid white;
    box-shadow: 1px 1px 20px  #e6e6e6;
  }
  @media(max-width: 768px){
    width: 90%;
    height: 220px;
  }
`;
const Name = styled.div`
  margin: 0;
  color: black; 
  line-height: 1.4;
  font-weight: bold;
  font-size: 20px;
`;
const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Img = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  width: 50px;
  margin-right: 10px;
  img {
    width: 100%;
    height: auto;
  }
`;
const DateItem = styled.div`
  padding-top: 6px;
  font-size: 12px;
  color: black; 
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 20px;  
  color: #2884F6 !important;
  line-height: 20px !important;
  padding-bottom: 3pximport { Backdrop } from './../UI/Backdrop/Backdrop';
;
`;
const Body = styled.div`
  height: 100%;
  color: black; 
`;
const ImgAndName = styled.div`
  display: flex;
  align-items: center;
`;
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
`;