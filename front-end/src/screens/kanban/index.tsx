import { useKanbanSearchParams, useProjectIdInUrl, useProjectInUrl, useTasksSearchParams } from "./util";
import { Kanban } from "../../types/kanban";
import { useKanbans } from "../../utils/kanban";
import { useDocumentTitle } from "../../utils";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "../../components/lib";
import { useTasksTypes } from "../../utils/task-type";
import { useTasks } from "../../utils/task";
import { Spin } from "antd";
import { CreateKanban } from "./create-kanban";
import { TaskModal } from "./task-modal";



export const KanbanScreen = () => {
  useDocumentTitle('Kanban List')

  const {data: currentProject} = useProjectInUrl();
  const {data: Kanbans, isLoading: kanbanIsLoading} = useKanbans(useKanbanSearchParams())
  const {isLoading:taskIsLoading, data:tasks} = useTasks(useTasksSearchParams());
  const isLoading = taskIsLoading || kanbanIsLoading;

  return (
    <ScreenContainer>
      <h1>{currentProject?.name} Kanban</h1>
      <SearchPanel/>
      {isLoading ?  <Spin size={"large"} style={{alignSelf:"self-end", marginTop:"10rem"}}/> :
        <ColumnsContainer>
          {
            Kanbans?.map((kanban: Kanban) => <KanbanColumn kanban={kanban} allTasks={tasks!} key={kanban._id}/>)
          }
          <CreateKanban/>
        </ColumnsContainer>
      }
      <TaskModal/>
    </ScreenContainer>
  )
}

export const ColumnsContainer = styled.div`
  display: flex;
  margin-right: 2rem;
  margin-top: 3rem;
  flex: 1;
  overflow: scroll;
  scrollbar-width: thin;
  
`
