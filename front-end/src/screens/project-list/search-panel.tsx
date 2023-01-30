
import { Form, Input, Select } from "antd";
import { Project } from "./list";
import { UserSelector } from "../../components/user-selector";

export interface User {
  token: string;
  id: number,
  name: string,
  email: string,
  title: string,
  organization: string
}

interface SearchPanelProps {
  users: User[],
  param: Partial<Pick<Project, 'name' | 'personId'> >
  setParam: (param: SearchPanelProps['param']) => void
}
export const SearchPanel = ({param, setParam, users}: SearchPanelProps) => {


  return <Form style={{marginBottom:"2rem"}} layout={'inline'}>
    <Form.Item>
      <Input
        type="text"
        onChange={event => setParam({
        ...param,
        name: event.target.value,
      })}
        placeholder={'project name'}
      />
    </Form.Item>
    <Form.Item>
      <UserSelector
        defaultOptionName={"Manager"}
        value={param.personId}
        onChange={value => {
          setParam({
            ...param,
            personId: value,
          })
      }}/>

    </Form.Item>
  </Form>
}
