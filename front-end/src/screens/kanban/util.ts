import { useLocation } from "react-router";
import { useProject } from "../../utils/project";
import { useUrlQueryParam } from "../../utils/url";
import { useMemo } from "react";


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
      typeId: param.typeId || undefined,
      processorId: param.processorId || undefined,
      tagId: param.tagId || undefined,
      name: param.name
     }
  }, [projectId, param])
}

export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()]
