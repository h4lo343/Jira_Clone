import { Dropdown, Menu, Modal, Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "../../components/pin";
import { useDeleteProject, useEditProject } from "../../utils/project";
import { ButtonNoPadding } from "../../components/lib";
import { useProjectModal, useProjectQueryKey } from "./util";
import { Project } from "../../types/project";
import { User } from "../../types/user";


interface ListProps extends TableProps<Project> {
  users: User[],
}

export const List = ({users, ...props }:ListProps) => {
  const {open} = useProjectModal();
  const {mutate} = useEditProject(useProjectQueryKey());
  const pinProject = (id: number) => (pin: boolean) => mutate({id, pin});
  const {startEdit} = useProjectModal();
  const editProject = (id: number) => startEdit(id);

  const {mutate: deleteProject} = useDeleteProject(useProjectQueryKey());
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: "Do you really want to delete this project?",
      content: "Click to delete",
      okText: "Confirm",
      onOk() {
        deleteProject({id})
      }
    })
  }

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
          return <Dropdown
            overlay={
              <Menu>
                <Menu.Item onClick={() => editProject(project.id)} key={'Edit'}>
                  Edit
                </Menu.Item>
                <Menu.Item onClick={() => confirmDeleteProject(project.id)} key={'Delete'}>
                  Delete
                </Menu.Item>
              </Menu>
            }
          >
            <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
          </Dropdown>
        }
      }
      ]}
    rowKey={'id'}
    {...props}
  />
}
