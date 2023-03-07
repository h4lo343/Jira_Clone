import { Row, ScreenContainer } from "../../components/lib";
import { useProjectInUrl } from "../kanban/util";
import { useDeleteEpic, useEpics } from "../../utils/epic";
import { useEpicQueryKey, useEpicSearchParams } from "./util";
import { Button, List } from "antd";
import dayjs from "dayjs";
import { useTasks } from "../../utils/task";
import { Link } from "react-router-dom";
import { CreateEpic } from "./create-epic";
import { useState } from "react";


export const EpicScreen = () => {
  const {data: currentProject} = useProjectInUrl();
  const {data: epics} = useEpics(useEpicSearchParams())
  const {data: tasks} = useTasks({projectId: currentProject?.id})
  const [epicCreateOpen, setEpicCreateOpen] = useState(false)
  const {mutateAsync: deleteEpic} = useDeleteEpic(useEpicQueryKey());

  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>{currentProject?.name} Task</h1>
        <Button type={"link"} onClick={() => setEpicCreateOpen(true)}>CreateEpic</Button>
      </Row>
      <List
        style={{overflow: "scroll", scrollbarWidth: "thin", height:"100%"}}
        dataSource={epics}
        itemLayout={'vertical'}
        renderItem={epic => <List.Item>
          <List.Item.Meta title={<Row between={true}>
            <span>{epic.name}</span>
            <Button type={'link'} onClick={() => deleteEpic({id: epic.id})}>Delete</Button>
          </Row>}
          description={<div>
            <div>Start Time:{dayjs(new Date(epic.start)).format('YYYY-MM-DD')}</div>
            <div>End Time:{dayjs(new Date(epic.end)).format('YYYY-MM-DD')}</div>
          </div>}
          />
          <div>
            {tasks?.filter(task => task.epicId === epic.id).map(task =>
              <div><Link key={task.id} to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}>{task.name}</Link></div>)}
          </div>
        </List.Item>}/>
      <CreateEpic onClose={() => {setEpicCreateOpen(false)}} open={epicCreateOpen}/>
    </ScreenContainer>
  )
}
