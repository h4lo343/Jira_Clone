import { Button, Divider, List, Popover, Typography } from "antd";
import { useProjects } from "../utils/project";
import styled from '@emotion/styled';
import { useDispatch } from "react-redux";
import { projectListActions } from "../screens/project-list/project-list-slice";



export const ProjectPopover = () => {
  const dispatch = useDispatch()
  const {data:projects, isLoading} = useProjects();
  const pinnedProject = projects?.filter(project => project.pin);

  const content = <ContentContainer>
    <List
      header={<Typography.Text style={{paddingLeft:"22px"}} type={"secondary"}>Collected Project</Typography.Text>}
      dataSource={pinnedProject}
      renderItem={project =>
        <List.Item>
        {project.name}
      </List.Item>}
    />
    <Divider style={{marginTop:"0"}}/>
    <Button
      style={{marginLeft:"20px"}}
      onClick={() => dispatch(projectListActions.openProjectModal())}
    >Create Projects</Button>
  </ContentContainer>
  return <Popover placement={"bottom"} content={content}>
    <span>
      Projects
    </span>
  </Popover>
}

const ContentContainer =  styled.div`
  min-width: 30rem;
`
