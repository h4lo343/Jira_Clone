
import { useHttp } from "./http";
import { useQuery } from "react-query";
import { TaskType } from "../types/task-type";


export const useTasksTypes =() => {
  const client = useHttp();

  return useQuery<TaskType[]>(["tasks"], () =>
    client("tasks/taskTypes")
  );
}
