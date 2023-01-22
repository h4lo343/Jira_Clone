import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";
import styled from '@emotion/styled';
import { Row } from "./components/lib";
import {ReactComponent as SoftwareLogo} from 'assets/software-logo.svg';
import { Dropdown, MenuProps } from "antd";

export const AuthenticatedApp = () => {
  const {logout, user} = useAuth();
  const items:  MenuProps['items'] = [{
    key: '1',
    label: (
      <a onClick={logout}>Log out</a>
    )
  }]
  return <Container>
    <Header between={true}>
      <HeaderLeft gap={true}>
        <SoftwareLogo width={'18rem'} color={'rgb(38, 132 , 255)'}/>
        <h2>logo</h2>
        <h2>project</h2>
        <h2 >user</h2>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown menu={{items}}>
          <a onClick={e => e.preventDefault()} style={{color:'blue'}}>
            Hi, {user?.name}
          </a>
        </Dropdown>
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
  padding: 3.2rem;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  z-index: 1;
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




