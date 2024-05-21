import { Form, Input } from "antd";
import { UserSelector } from "../../components/user-selector";
import { Project } from "../../types/project";
import { User } from "../../types/user";

interface SearchPanelProps {
  users: User[],
  param: Partial<Pick<Project, 'name' | 'personId'> >
  setParam: (param: SearchPanelProps['param']) => void
}
export const
    SearchPanel = ({param, setParam, users}: SearchPanelProps) => {


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
        defaultOptionName={"All Manager"}
        onChange={value => {
          setParam({
            ...param,
            personId: value,
          })
      }}/>

    </Form.Item>
  </Form>
}
