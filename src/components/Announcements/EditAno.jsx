// import { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useHistory } from 'react-router-dom'
// import { createAnnouncement } from '../../store/createSlice'
// import styled from 'styled-components'
// import { NavLink } from 'react-router-dom'
// import TextareaAutosize from 'react-textarea-autosize'
// import { finishDeleteAnnouncement, finishUpdateAnnouncement } from '../../services/API/create'

// const EditAnnouncement = () => {
//   const dispatch = useDispatch()
//   let history = useHistory()
//   const { activeAnnouncementItem } =
//     useSelector(state => ({
//       activeAnnouncementItem: state.post.announcements.activeAnnouncementItem
//     }))
//     const [title, setTitle] = useState(activeAnnouncementItem.title)
//     const [body, setBody] = useState(activeAnnouncementItem.body)  

//     const dellAnnouncement = () => {
//       dispatch(finishDeleteAnnouncement(activeAnnouncementItem.id))
//       return history.push('/announcements')
//     }
//     const isAuth = () => {
//       return activeAnnouncementItem.userId === JSON.parse(localStorage.getItem('user')).id
//     }
//     const titleHandle = e => {
//       let val = e.target.value
//       setTitle(val)
//     }
//     const bodyHandle = e => {
//       let val = e.target.value
//       setBody(val)
//     }
//     const getItem = () => {
//       let announcementItem = {
//         title, body,
//         userId: JSON.parse(localStorage.getItem('user')).id,
//         createdAt: activeAnnouncementItem.createdAt,
//         updatedAt: new Date().toISOString()
//       }
//       dispatch(createAnnouncement(announcementItem))
//     }
//     return (
//       <EditAnnouncements>
//         <Container>
//           <Header>
//             <StyledNavLink to={'/announcements'}>
//               <Name>{activeAnnouncementItem.user.firstname} {activeAnnouncementItem.user.lastname}</Name>
//             </StyledNavLink>            
//             {isAuth() &&
//               <Icon className="material-icons" onClick={() => {
//               getItem()
//               dispatch(finishUpdateAnnouncement(activeAnnouncementItem.id))
//               history.push('/announcements')
//               }}>done_all</Icon>
//             }
//           </Header>
//           <h1><Title value={title} onChange={e => { titleHandle(e) }}/></h1>
//           <Body value={body} onChange={e => { bodyHandle(e) }}/>
//           {isAuth() &&
//             <Dell>
//               <Icon className={"material-icons"} onClick={() => dellAnnouncement()}>delete</Icon>
//             </Dell>
//           }
//         </Container>
//       </EditAnnouncements>
//     )
// }
// export default EditAnnouncement

// const EditAnnouncements = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   padding: 90px 0 50px;
//   width: 100%;
//   height: auto;
//   color: #fff; 
//   cursor: pointer;
// `;
// const Container = styled.div`
//   width: 70%;
//   height: auto;
//   border: 1px solid rgb(129, 129, 129);
//   border-radius: 5px;
//   background: linear-gradient(90deg, #5041b2 0%, #7969e6 100%);
//   padding: 20px; 
//   @media (max-width: 1250px){
//     width: 95%
//   }
// `;
// const Header = styled.div`
//   display: flex;
//   justify-content: space-between;
// `;
// const Name = styled.p`
//   color: white;
//   :hover {
//     color: rgb(167, 167, 167);
//   }
// `;
// const Title = styled.input`
//   background: #7969e6;
//   width: 100%;
//   padding: 0 15px;
//   padding: 10px 15px;
//   margin-bottom: 15px;
// `;
// const Body = styled(TextareaAutosize)`
//   margin: 0;
//   background: #7969e6;
//   width: 100%;
//   padding: 10px 15px;
//   resize: none
// `;
// const Icon = styled.span`
//   color: #fff; 
//   border-radius: 50%;
//   padding: 8px;
//   :hover {
//     background: rgb(8, 9, 63);
//     transition: all .6s ease-in;
//   }
// `;
// const Dell = styled.span`
//   display: flex;
//   justify-content: flex-end;  
// `;
// const StyledNavLink = styled(NavLink)`
//   text-decoration: none;
// `;