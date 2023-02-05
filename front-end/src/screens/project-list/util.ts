import { useSetUrlSearchParam, useUrlQueryParam } from "../../utils/url";
import { useMemo } from "react";
import { useProject } from "../../utils/project";
import useUrlState from '@ahooksjs/use-url-state';

export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  // 因为可能用户不输入param，这个时候Number(null)可能为0，所以要加上 ||undefined
  return [
    useMemo(() => { return {...param, personId: Number(param.personId) || undefined}}, [param]),
    setParam
  ] as const
}

export const useProjectModal = () => {
  const [ state, setProjectCreate] = useUrlState<{
    projectCreate: boolean,
    editingProjectId: string | undefined
  }>({
    projectCreate: false,
    editingProjectId: undefined
  });

  const {projectCreate, editingProjectId} = state;

  const {data: editingProject, isLoading} = useProject(Number(editingProjectId));
  const open = () => setProjectCreate({projectCreate: true});
  const close = () => setProjectCreate({ projectCreate: undefined, editingProjectId: undefined });
  const startEdit = (id: number) => {setProjectCreate({projectCreate: undefined, editingProjectId: id});
  }

  return {
    projectModalOpen: projectCreate === "true"  || Boolean(editingProjectId),
    open,
    close,
    startEdit,
    editingProject,
    isLoading,
  }
}
