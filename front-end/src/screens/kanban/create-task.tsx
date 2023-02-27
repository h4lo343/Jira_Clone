import { useEffect, useState } from "react";
import { useAddTask } from "../../utils/task";
import { useProjectIdInUrl, useTasksQueryKey } from "./util";
import { Card, Input } from "antd";
import { useAuth } from "../../context/auth-context";


export const CreateTask = ({kanbanId}:{kanbanId: number}) => {
  const {user} = useAuth()
  const processorId = user?.id;


  const [name, setName] = useState('');
  const {mutateAsync: addTask} = useAddTask(useTasksQueryKey());
  const projectId = useProjectIdInUrl();
  const [inputMode, setInputMode] = useState(false)

  const submit = async () => {
    await addTask({projectId, name, kanbanId, processorId, typeId:2});
    setInputMode(false);
    setName("");
  }

  const toggle = () => setInputMode(mode => !mode);

  useEffect(() => {
    if (!inputMode) {
      setName("")
    }
  }, [inputMode])

  if(!inputMode) {
    return <div onClick={toggle} style={{textAlign:"center"}}>+Create Issue</div>
  }

  return <Card>
    <Input
      onBlur={toggle}
      placeholder={"what need to do"}
      autoFocus={true}
      onPressEnter={submit}
      value={name}
      onChange={(evt) => setName(evt.target.value)}
    />
  </Card>
}
