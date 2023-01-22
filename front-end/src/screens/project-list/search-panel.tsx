
import { Form, Input, Select } from "antd";

export interface User {
  token: string;
  id: string,
  name: string,
  email: string,
  title: string
}

interface SearchPanelProps {
  users: User[],
  param: {
    name: string,
    personId: string
  },
  setParam: (param: SearchPanelProps['param']) => void
}
export const SearchPanel = ({param, setParam, users}: SearchPanelProps) => {


  return <Form style={{marginBottom:"2rem"}} layout={'inline'}>
    <Form.Item>
      <Input
        type="text"
        value={param.name}
        onChange={event => setParam({
        ...param,
        name: event.target.value,
      })}
        placeholder={'project name'}
      />
    </Form.Item>
    <Form.Item>
      <Select value={param.personId}
              onChange={value => {
                setParam({
                  ...param,
                  personId: value,
                })
              }
            }
      >
        <Select.Option value={""}>Manager</Select.Option>
        {
          users.map(user => <Select.Option key={user.id} value={user.id}>{user.name}</Select.Option>)
        }
      </Select>
    </Form.Item>
  </Form>
}
