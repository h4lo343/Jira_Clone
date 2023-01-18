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

  return <form action="">
    <div>
      <input type="text" value={param.name} onChange={event => setParam({
        ...param,
        name: event.target.value
      })}/>
      <select value={param.personId} onChange={event => {
        setParam({
          ...param,
          personId: event.target.value,
        })
      }
      }>
        <option value={""}>Manager</option>
        {
          users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)
        }
      </select>
    </div>
  </form>
}
