import { useDispatch, useSelector } from 'react-redux'
import { setReduxPageNumPosts } from '../../store/postSlice'
import { StylePanel, Container, Pagination, Num } from '../../Assets/Styles/Other/Panel'

const Panel = () => {
  const dispatch = useDispatch()
  const { pageNum, pageCount } = useSelector(state => ({
    pageNum: state.post.pagination.posts.pageNum,
    pageCount: state.post.pagination.posts.pageCount
  }))  
  return (
    <StylePanel>
      <Container>
        <Pagination>
          { pageCount.map(num => {
            return <Num className={pageNum === num
              ? 'Num selectedPage'
              : ''} key={num} onClick={() => {
                dispatch(setReduxPageNumPosts(num))
              }}>{num}</Num>
          })}
        </Pagination>
      </Container>
    </StylePanel>
  )
}
export default Panel