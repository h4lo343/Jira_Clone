import { useProjectIdInUrl } from "../kanban/util";

export const useEpicSearchParams = () => {
  return {projectId: useProjectIdInUrl()}
}

export const useEpicQueryKey = () => ['epics', useEpicSearchParams()]
