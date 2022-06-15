import styled from 'styled-components'
import Panel from './../Dashboard/Panel'
import Posts from './../../components/Posts/Posts'
export const HomePage = () => {
    return (
      <Container>
        <Panel />
        <Posts />
      </Container>  
    )
}
const Container = styled.div``