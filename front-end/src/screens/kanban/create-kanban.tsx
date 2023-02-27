import { useState } from "react";
import { useKanbanQueryKey, useProjectIdInUrl } from "./util";
import { useAddKanban } from "../../utils/kanban";
import { ColumnsContainer } from "./index";
import { Input } from "antd";
import { Container } from "./kanban-column";

export const CreateKanban = () => {
  const [name, setName] = useState('');
  const projectId = useProjectIdInUrl()
  const {mutateAsync: addKanban} = useAddKanban(useKanbanQueryKey());

  const submit = async () => {
    await addKanban({name, projectId})
    setName('')
  }

  return <Container>
    <Input
      size={"large"}
      placeholder={"Name of new created Kanban"}
      onPressEnter={submit}
      value={name}
      onChange={(evt) => setName(evt.target.value)}
    />
  </Container>
}
