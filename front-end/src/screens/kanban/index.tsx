          import {
  useKanbanQueryKey,
  useKanbanSearchParams,
  useProjectIdInUrl,
  useProjectInUrl,
  useTasksQueryKey,
  useTasksSearchParams
} from "./util";
import { Kanban } from "../../types/kanban";
import { useKanbans, useReorderKanban } from "../../utils/kanban";
import { useDocumentTitle } from "../../utils";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { ScreenContainer } from "../../components/lib";
import { useTasksTypes } from "../../utils/task-type";
import { useReorderTask, useTasks } from "../../utils/task";
import { Spin } from "antd";
import { CreateKanban } from "./create-kanban";
import { TaskModal } from "./task-modal";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "../../components/drag-and-drop";
import { useCallback } from "react";
import { LoginScreen } from "../../unauthenticated-app/login";
import { log } from "util";



export const KanbanScreen = () => {

  useDocumentTitle('Kanban List')

  const {data: currentProject} = useProjectInUrl();
  const {data: Kanbans, isLoading: kanbanIsLoading} = useKanbans(useKanbanSearchParams())
  
  const isLoading =  kanbanIsLoading;

  const onDragEnd = useDragEnd();
  return (
    <DragDropContext onDragEnd={onDragEnd}>
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

export const useDragEnd = () => {
  const {data: kanbans} = useKanbans(useKanbanSearchParams());
  const {mutate: reorderKanban} = useReorderKanban(useKanbanQueryKey());
  const {mutate: reorderTask} = useReorderTask(useTasksQueryKey());
  const {data: allTasks} = useTasks(useTasksSearchParams());
  return useCallback(
    ({source, destination, type}:DropResult) => {

      if(!destination) {
        return
      }
      if(type === 'COLUMN') {
        const fromId = kanbans?.[source.index].id
        const toId = kanbans?.[destination.index].id
        if (!fromId || !toId || fromId === toId) {
          return
        }
        const type = destination.index > source.index ? 'after' : 'before'
        reorderKanban({fromId, referenceId: toId, type})
      }
      if (type === 'ROW') {

        const fromKanbanId = +source.droppableId
        const toKanbanId = +destination.droppableId

        if (fromKanbanId !== toKanbanId) {
          return
        }
        const fromTask = allTasks?.filter(task => task.kanbanId === fromKanbanId)[source.index]
        const toTask = allTasks?.filter(task => task.kanbanId === fromKanbanId)[destination.index]
        if(fromTask?.id === toTask?.id) {
          return
        }
        reorderTask({
          fromId: fromTask!.id,
          referenceId: toTask!.id,
          type: fromKanbanId === toKanbanId && destination.index > source.index ? "after" : "before"
        })
      }
    },
    [kanbans, reorderKanban, allTasks, reorderTask]
  );

}

export const ColumnsContainer = styled(DropChild)`
  display: flex;
  margin-right: 2rem;
  margin-top: 3rem;
  flex: 1;
  overflow: scroll;
  scrollbar-width: thin;
  
`
