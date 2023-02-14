import { Project } from "../types/project";
import { useHttp } from "./http";
import { useQuery } from "react-query";
import { Task } from "../types/task";


export const useTasks = (param?: { processorId?: any; tagId?: any; name?: any; typeId?: any; projectId?: number }) => {
  const client = useHttp();

  return useQuery<Task[], Error>(["tasks", param], () =>
    client("tasks", { data: param })
  );
}
