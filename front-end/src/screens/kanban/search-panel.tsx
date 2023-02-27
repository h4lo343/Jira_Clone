import { useProjectIdInUrl, useTasksSearchParams } from "./util";
import { useSetUrlSearchParam } from "../../utils/url";
import { Button, Input } from "antd";
import { UserSelector } from "../../components/user-selector";
import { TaskTypeSelector } from "../../components/task-type-select";
import styled from "@emotion/styled";


export const SearchPanel = () => {
  const searchParams = useTasksSearchParams();
  const setSearchParams = useSetUrlSearchParam();

  const reset = () => {
    setSearchParams({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined,
    });
  };

  return <Row >
    <Input
      style={{width: "20rem"}}
      placeholder={"Task name"}
      value={searchParams.name}
      onChange={evt => setSearchParams({name: evt.target.value})} />
      <UserSelector defaultOptionName={"Processor"}  onChange={value => setSearchParams({processorId: value})} value={searchParams.processorId}/>
      <TaskTypeSelector defaultOptionName={"Types"} onChange={value => setSearchParams({typeId: value})} value={searchParams.typeId}/>
      <Button onClick={reset}>Clean Filter</Button>
  </Row>

}


const Row = styled.div`
  display: flex;
  gap: 1rem;
`
