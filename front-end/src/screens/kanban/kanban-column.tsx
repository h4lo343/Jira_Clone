import { Kanban } from "../../types/kanban";
import { useTasks } from "../../utils/task";
import { useTasksSearchParams } from "./util";
import { useTasksTypes } from "../../utils/task-type";
import { TaskType } from "../../types/task-type";
import TaskIcon from "../../assets/task";
import BugIcon from "../../assets/bug";
import styled from "@emotion/styled";
import { Card } from "antd";

const TaskTypeIcon = ({id}:{id: string}) => {
  const {data: taskTypes} = useTasksTypes();

  const name = taskTypes?.find(taskType => taskType.id === id)?.name
  if (!name) {
    return null
  }
    return name === 'task' ? <TaskIcon/> : <BugIcon/>
}

export const KanbanColumn = ({kanban}:{kanban: Kanban}) => {
  const {data: allTasks} = useTasks(useTasksSearchParams());

  const tasks = allTasks?.filter(task => task.kanbanId === kanban.id);

  return <Container>
    <h2>{kanban.name}</h2>
    <TasksContainer>
      {tasks?.map(task =>
        <Card style={{marginBottom: '0.5rem'}} key={task._id}>
          <div>
            {task.name}
          </div>
          <TaskTypeIcon id={task._id}/>
        </Card>)}
    </TasksContainer>
  </Container>

}

const Container = styled.div`
  flex-basis: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex; 
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`
const TasksContainer = styled.div`
  max-height: 25rem;
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar { display: none; }
  scrollbar-width: thin;
`
