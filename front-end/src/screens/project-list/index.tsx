import { SearchPanel } from "./search-panel";
import { List } from "./list";
import {useState, useEffect} from 'react';
import { cleanObject, useDebounce, useMount } from "../../utils/index";

import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";

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

  return (
    <Container>
      <h1>Project List</h1>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List list={list} users={users}/>
    </Container>)
}

const Container = styled.div`
  padding: 3.2rem;
`
