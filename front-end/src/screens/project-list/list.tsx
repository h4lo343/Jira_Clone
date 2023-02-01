import { Dropdown, MenuProps, Table, TableProps } from "antd";
import { User } from "./search-panel";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "../../components/pin";
import { useEditProject } from "../../utils/project";
import { ButtonNoPadding } from "../../components/lib";

export interface Project {
  id: number,
  name: string,
  personId: number,
  pin: boolean,
  organization: string,
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[],
  refresh?: () => void,
  projectButton: JSX.Element
}

export const List = ({users, ...props }:ListProps) => {
  const {mutate} = useEditProject();
  const pinProject = (id: number) => (pin: boolean) => mutate({id, pin}).then(props.refresh);
  const items : MenuProps['items'] = [
    {
      key: 'edit',
      label: props.projectButton,
    }
  ]

  return <Table
    pagination={false}
    columns={[
      {
        title: <Pin checked={true} disabled={true}/>,
        render(value, project) {
          return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)}/>
        }
      },
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
        },
      {
        render(value, project) {
          return <Dropdown menu={{items}}>
            <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
          </Dropdown>
        }
      }
      ]}
    rowKey={'id'}
    {...props}
  />
}
