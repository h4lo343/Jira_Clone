import { Kanban } from "../../types/kanban";
import { useTasks } from "../../utils/task";
import { useKanbanQueryKey, useTaskModal, useTasksSearchParams } from "./util";
import { useTasksTypes } from "../../utils/task-type";
import { TaskType } from "../../types/task-type";
import TaskIcon from "../../assets/task";
import BugIcon from "../../assets/bug";
import styled from "@emotion/styled";
import { Button, Card, Dropdown, Menu, Modal} from "antd";
import { CreateTask } from "./create-task";
import task from "../../assets/task";
import { Task } from "../../types/task";
import { Mark } from "../../components/mark";
import { useDeleteKanban } from "../../utils/kanban";
import { Row } from "../../components/lib";

const TaskTypeIcon = ({id}:{id: number}) => {
  const {data: taskTypes} = useTasksTypes();
  const name = taskTypes?.find(taskType => taskType.id === id)?.name
  if (!name) {
    return null
  }
    return name === 'task' ? <TaskIcon/> : <BugIcon/>
}

const TaskCard = ({task}:{task: Task }) => {

  const {startEdit} = useTaskModal();
  const {name: keyword} = useTasksSearchParams();
  return (
    <Card onClick={()=> startEdit(task.id)} style={{marginBottom: '0.5rem'}} key={task._id}>
      <div>
        <Mark keyword={keyword} name={task.name}/>
      </div>
      <TaskTypeIcon id={task.id}/>
    </Card>
  )
}
const More = ({kanban}:{kanban: Kanban}) => {
  const {mutateAsync} = useDeleteKanban(useKanbanQueryKey())
  const startEdit = () => {
    Modal.confirm({
      okText: "Confirm",
      cancelText: "Cancel",
      title: `Delete The Kanban ${kanban.name}?`,
      onOk() {
        return mutateAsync({id: kanban.id})
      }
    })
  }
  const overlay = <Menu>
    <Menu.Item>
      <Button type={'link'} onClick={startEdit}>
        Delete
      </Button>
    </Menu.Item>
  </Menu>

  return <Dropdown overlay={overlay}>
    <Button type={'link'}>...</Button>
  </Dropdown>
}


export const KanbanColumn = ({kanban, allTasks}:{kanban: Kanban, allTasks: Task[]}) => {

  const tasks = allTasks?.filter(task => task.kanbanId === kanban.id);
  return <Container>
    <Row between={true}>
      <h2>{kanban.name}</h2>
      <More kanban={kanban}/>
    </Row>
    <TasksContainer>
      {tasks?.map(task =>
        <TaskCard task={task} key={task._id}/>
      )}
      <CreateTask kanbanId={kanban.id}/>
    </TasksContainer>
  </Container>
}


export const Container = styled.div`
  min-width: 20rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`
const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar { display: none; }
  scrollbar-width: thin;
`
