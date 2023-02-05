import { useAsync } from "./use-async";
import { Project } from "../screens/project-list/list";
import { useEffect } from "react";
import { cleanObject } from "./index";
import { useHttp } from "./http";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useProjects =(param?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[], Error>(["projects", param], () =>
    client("projects", { data: param })
  );
}

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation((params: Partial<Project>) => client(`projects/${params.id}`, {
      method: "PATCH",
      data: params
    }), {
      onSuccess: () => queryClient.invalidateQueries('projects')
    }
  )
}

export const useAddProject = () => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project[], Error>(
    ['project', {id}],
    () => client(`projects/${id}`),
    {
      enabled: !!id
    }
  )
}
