import { Project } from "../types/project";
import { useHttp } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { Task } from "../types/task";
import { Kanban } from "../types/kanban";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
  useReorderTaskConfig
} from "./use-optimistic-options";
import { SortProps } from "./kanban";


export const useTasks = (param?: { processorId?: any; tagId?: any; name?: any; typeId?: any; projectId?: number }) => {
  const client = useHttp();

  return useQuery<Task[], Error>(["tasks", param], () =>
    client("tasks", { data: param })
  );
}

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};


export const useTask = (id?: number) => {
  const client = useHttp();
  return useQuery<Task, Error>(
    ['tasks', {id}],
    () => client(`tasks/${id}`),
    {
      enabled: !!id
    }
  )
}

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        method: "PATCH",
        data: params,
      }),

  );
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({id}: {id:number}) =>
      client(`tasks/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useReorderTask = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation((params: SortProps) => {
      return client('tasks/reorder' , {
        data: params,
        method: 'POST'
      });
    },
    useReorderTaskConfig(queryKey)
  )
}
