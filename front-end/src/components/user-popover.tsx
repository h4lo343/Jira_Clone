import { Button, Divider, List, Popover, Typography } from "antd";
import styled from "@emotion/styled";
import { useProjectModal } from "../screens/project-list/util";
import { useUsers } from "../utils/user";


export const UserPopover = () => {
  const {data: users, isLoading} = useUsers();


  const content = <ContentContainer>
    <List
      header={<Typography.Text style={{paddingLeft:"22px"}} type={"secondary"}>User List</Typography.Text>}
      dataSource={users}
      renderItem={user =>
        <List.Item>
          {user.name}
        </List.Item>}
    />
    <Divider style={{marginTop:"0"}}/>
  </ContentContainer>
  return <Popover placement={"bottom"} content={content}>
    <span>
      Users
    </span>
  </Popover>
}

const ContentContainer =  styled.div`
  min-width: 30rem;
`
