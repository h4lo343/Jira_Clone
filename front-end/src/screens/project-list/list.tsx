import { Table, TableProps } from "antd";
import { User } from "./search-panel";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

export interface Project {
  id: string,
  name: string,
  personId: string,
  pin: boolean,
  organization: string,
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[],
}

export const List = ({users, ...props }:ListProps) => {
  return <Table
    pagination={false}
    columns={[
      {
        title:"name",
        render(value, project) {
          return <Link to={project.id+""}>{project.name}</Link>
        }
      },
      {
        title:"Department",
        dataIndex:"organization",
        sorter:(a,b) => {return a.name.localeCompare(b.name)}
      },
      {
        title:"Created Time",
        dataIndex:"created",
        render(created){
          return <span>
            {created ? dayjs(created).format('YYYY-MM-DD') : "none"}
          </span>
        }
      },
      {
        title:"manager",
        render(value, project,index){
          return <span>
            {users.find(user => user.id === project.personId)?.name || "unknown"}
          </span>
          }
        }
      ]}
    rowKey={'id'}
    {...props}
  />
}
