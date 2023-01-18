import { SearchPanel } from "./search-panel";
import { List } from "./list";
import {useState, useEffect} from 'react';
import { cleanObject, useDebounce, useMount } from "utils";
import qs from "qs";
import { useHttp } from "../../utils/http";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })

  const debouncedParam = useDebounce(param, 1000);

  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const client = useHttp();

  useEffect(() => {
    client("projects", {data: cleanObject(debouncedParam)}).then(setList);
  }, [debouncedParam]);

  useMount(() => {
    client('users').then(setUsers);
  })

  return <div>
    <SearchPanel param={param} setParam={setParam} users={users} />
    <List list={list} users={users}/>
  </div>
}
