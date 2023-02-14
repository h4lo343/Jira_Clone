import { useProjectIdInUrl, useTasksSearchParams } from "./util";
import { useSetUrlSearchParam } from "../../utils/url";
import { Button, Input, Row } from "antd";
import { UserSelector } from "../../components/user-selector";
import { TaskTypeSelector } from "../../components/task-type-select";


export const SearchPanel = () => {
  const searchParams = useTasksSearchParams();
  const setSearchParams = useSetUrlSearchParam();


  return <Row>
    <Input
      style={{width: "20rem"}}
      placeholder={"Task name"}
      value={searchParams.name}
      onChange={evt => setSearchParams({name: evt.target.value})} />
      <UserSelector defaultOptionName={"Processor"}  onChange={value => setSearchParams({processorId: value})}/>
      <TaskTypeSelector defaultOptionName={"Types"} onChange={value => setSearchParams({typeId: value})}/>

  </Row>

}
