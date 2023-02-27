import { useLocation } from "react-router";
import { useProject } from "../../utils/project";
import { useSetUrlSearchParam, useUrlQueryParam } from "../../utils/url";
import { useCallback, useMemo } from "react";
import { useTask } from "../../utils/task";


export const useProjectIdInUrl = () => {
  const {pathname} = useLocation();
  const id = pathname.match(/projects\/(\d+)\/kanban/)?.[1]
  return Number(id);
}

export const useProjectInUrl = () => {
  return useProject(useProjectIdInUrl());
}

export const useKanbanSearchParams = () => {
  return {projectId: useProjectIdInUrl()}
}

export const useKanbanQueryKey = () => ['kanbans', useKanbanSearchParams()]

export const useTasksSearchParams = () => {
  const [param, setParam] = useUrlQueryParam([
    'name',
    'typeId',
    'processorId',
    'tagId'
  ])

  const projectId = useProjectIdInUrl();
  return useMemo(() => {
    return {
      projectId: projectId,
      typeId: param.typeId ,
      processorId: param.processorId ,
      tagId: param.tagId ,
      name: param.name
     }
  }, [projectId, param])
}

export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()]

export const useTaskModal = () => {
  const [{editingTaskId}, setEditingTaskId] = useUrlQueryParam(['editingTaskId'])

  const {data: editingTask, isLoading} = useTask(Number(editingTaskId));
  const startEdit = useCallback( (id:number) => {
    setEditingTaskId({editingTaskId:id})
  }, [setEditingTaskId])
  const close = useCallback(() => {
    setEditingTaskId({editingTaskId: undefined})
  }, [setEditingTaskId])

  return {
    editingTaskId,
    editingTask,
    startEdit,
    close,
    isLoading
  }
}
