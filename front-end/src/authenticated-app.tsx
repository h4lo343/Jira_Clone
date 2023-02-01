import { ProjectListScreen } from "./screens/project-list";
import { useAuth } from "./context/auth-context";
import styled from '@emotion/styled';
import { ButtonNoPadding, Row } from "./components/lib";
import {ReactComponent as SoftwareLogo} from 'assets/software-logo.svg';
import { Button, Dropdown, MenuProps } from "antd";
import { Navigate, Route, Routes } from "react-router";
import { ProjectScreen } from "./screens/project";
import { BrowserRouter as Router} from "react-router-dom";
import { resetRoute } from "./utils";
import { useState } from "react";
import { ProjectModal } from "./screens/project-list/project-modal";
import { ProjectPopover } from "./components/project-popover";

export const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState<boolean>(false);
  return (
    <Container>
      <PageHeader
        projectButton={
        <Button
          style={{paddingLeft:"22px"}}
          type={'link'}
          onClick={() => setProjectModalOpen(true)}
        >
          Create Project
        </Button>
      }/>
      <Main>
        <Router>
          <Routes>
            <Route path='/projects' element={<ProjectListScreen projectButton = {<Button
              type={'link'}
              onClick={() => setProjectModalOpen(true)}
            >
              Create Project
            </Button>}/>}/>
            <Route path='/projects/:projectId/*' element={<ProjectScreen/>}/>
            <Route index element={<Navigate to='/projects'/>}/>
          </Routes>
        </Router>
      </Main>
      <ProjectModal projectModalOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)}/>
    </Container>
  )
}

const PageHeader = (props:{projectButton: JSX.Element}) => {
  const {logout, user} = useAuth();
  const items:  MenuProps['items'] = [{
    key: '1',
    label: (
      <a onClick={logout}>Log out</a>
    )
  }]

  return <Header between={true}>
    <HeaderLeft gap={true}>
      <ButtonNoPadding type={'link'} onClick={resetRoute} >
        <SoftwareLogo width={'12rem'} color={'rgb(38, 132 , 255)'}/>
      </ButtonNoPadding>
      <ProjectPopover {...props}/>
      <span>logo</span>
      <span>project</span>
      <span>user</span>
    </HeaderLeft>
    <HeaderRight>
      <Dropdown menu={{items}}>
        <a onClick={e => e.preventDefault()} style={{color:'blue'}}>
          Hi, {user?.name}
        </a>
      </Dropdown>
    </HeaderRight>
  </Header>
}



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


const Main = styled.main`

`




