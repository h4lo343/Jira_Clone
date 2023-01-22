import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";
import styled from '@emotion/styled';
import { Row } from "./components/lib";

export const AuthenticatedApp = () => {
  const {logout} = useAuth();
  return <Container>
    <Header between={true}>
      <HeaderLeft gap={true}>
        <h2>logo</h2>
        <h2>project</h2>
        <h2 >user</h2>
      </HeaderLeft>
      <HeaderRight>
        <button onClick={logout}>Logout</button>
      </HeaderRight>
    </Header>
    <Main>
      <ProjectListScreen/>
    </Main>
  </Container>
}

const HeaderItem = styled.h3`
  margin-right: 3rem;
`

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr; 
  height: 100vh;
`

const Header = styled(Row)`
   
`

const HeaderLeft = styled(Row)`
`

const HeaderRight = styled.div``

const PageHeader = styled.header`
  display: grid;
  height: 6rem;
`

const Main = styled.main`
  
`




