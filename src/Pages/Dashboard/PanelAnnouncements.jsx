import { useDispatch, useSelector } from 'react-redux'
import { setReduxPageNumAnnouncements } from '../../store/postSlice'
import { StylePanel, Container, Pagination, Num } from '../../Assets/Styles/Other/Panel'

const PanelAnnouncements = () => {
  const dispatch = useDispatch()
  const { pageNum, pageCount } = useSelector(state => ({
    pageNum: state.post.pagination.announcements.pageNum,
    pageCount: state.post.pagination.announcements.pageCount
  }))  
  return (
    <StylePanel>
      <Container>
        <Pagination>
          { pageCount.map(num => {
            return <Num className={pageNum === num
              ? 'Num selectedPage'
              : ''} key={num} onClick={() => {
                dispatch(setReduxPageNumAnnouncements(num))
              }}>{num}</Num>
          })}
        </Pagination>
      </Container>
    </StylePanel>
  )
}
export default PanelAnnouncements