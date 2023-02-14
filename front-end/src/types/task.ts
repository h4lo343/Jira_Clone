export interface Task {
  _id: string,
  name: string,
  processorId: number,
  projectId: number,
  epicId: number,
  kanbanId: number,
  typeId: number,
}
