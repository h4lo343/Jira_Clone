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
import { DragDropContext } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "../../components/drag-and-drop";



export const KanbanScreen = () => {
  useDocumentTitle('Kanban List')

  const {data: currentProject} = useProjectInUrl();
  const {data: Kanbans, isLoading: kanbanIsLoading} = useKanbans(useKanbanSearchParams())
  const {isLoading:taskIsLoading, data:tasks} = useTasks(useTasksSearchParams());
  const isLoading = taskIsLoading || kanbanIsLoading;

  return (
    <DragDropContext onDragEnd={() => {

    }}>
      <ScreenContainer>
        <h1>{currentProject?.name} Kanban</h1>
        <SearchPanel/>
        {isLoading ?  <Spin size={"large"} style={{alignSelf:"self-end", marginTop:"10rem"}}/> :
          <Drop type={'COLUMN'} direction={"horizontal"} droppableId={'kanban'}>
            <ColumnsContainer>
              {
                Kanbans?.map((kanban: Kanban, index) => {
                  return <Drag key={kanban._id} draggableId={'kanban' + kanban.id} index={index}>
                    <KanbanColumn kanban={kanban}  key={kanban._id}/>
                  </Drag>
                })
              }
              <CreateKanban/>
            </ColumnsContainer>
          </Drop>
        }
        <TaskModal/>
      </ScreenContainer>
    </DragDropContext>
  )
}

export const ColumnsContainer = styled(DropChild)`
  display: flex;
  margin-right: 2rem;
  margin-top: 3rem;
  flex: 1;
  overflow: scroll;
  scrollbar-width: thin;
  
`
