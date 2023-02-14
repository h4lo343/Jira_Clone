import { IdSelector } from "./id-selector";
import { useTasksTypes } from "../utils/task-type";

export const TaskTypeSelector = (props: React.ComponentProps<typeof IdSelector>) => {
  const taskTypes = [{name: "bug", id: 1}, {name: "task", id: 2}]
  return <IdSelector options={taskTypes || []} {...props}></IdSelector>
}
