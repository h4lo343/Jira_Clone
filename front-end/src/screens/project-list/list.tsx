import { Table } from "antd";
import { User } from "./search-panel";

interface Project {
  id: string,
  name: string,
  personId: string,
  pin: boolean,
  organization: string
}

interface ListProps {
  list: Project[],
  users: User[],
}

export const List = ({list, users}:ListProps) => {
  return <Table pagination={false} columns={[{
    title:"name",
    dataIndex:"name",
    sorter:(a,b) => {
      return a.name.localeCompare(b.name)
  }
  },{
    title:"manager",
    render(value, project,index){
      return <span>
        {users.find(user => user.id === project.personId)?.name || "unknown"}
      </span>
    }
  }]} dataSource={list} rowKey={'id'}></Table>
}
