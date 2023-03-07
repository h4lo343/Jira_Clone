import { Button, Divider, List, Popover, Typography } from "antd";
import { useProjects } from "../utils/project";
import styled from '@emotion/styled';
import { useProjectModal, useProjectQueryKey } from "../screens/project-list/util";



export const ProjectPopover = () => {
  const {data:projects, isLoading, refetch} = useProjects();
  const pinnedProject = projects?.filter(project => project.pin);
  const {open} = useProjectModal();

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
      onClick={open}
      type={"link"}
    > Create Project </Button>
  </ContentContainer>
  return <Popover onOpenChange={() => refetch()} placement={"bottom"} content={content}>
    <span>
      Projects
    </span>
  </Popover>
}

const ContentContainer =  styled.div`
  min-width: 30rem;
`
