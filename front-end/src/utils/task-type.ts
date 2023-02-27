
import { useHttp } from "./http";
import { useQuery, useQueryClient } from "react-query";
import { TaskType } from "../types/task-type";


export const useTasksTypes =() => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useQuery<TaskType[]>(["taskType"], () =>
    client("tasks/taskTypes"),
  );
}
