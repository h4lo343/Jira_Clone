import { SearchPanel } from "./search-panel";
import { List, Project } from "./list";
import {useState, useEffect} from 'react';
import { cleanObject, useDebounce, useDocumentTitle, useMount } from "../../utils/index";
import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useAsync } from "../../utils/use-async";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { useUrlQueryParam } from "../../utils/url";
import { useProjectSearchParams } from "./util";
import { useDispatch } from "react-redux";
import { ButtonNoPadding } from "../../components/lib";
import { projectListActions } from "./project-list-slice";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  useDocumentTitle("Project List", false);

  const [param, setParam] = useProjectSearchParams();
  const debouncedParam = useDebounce(param, 1000);
  const {isLoading, error, data: list, retry } = useProjects(debouncedParam);
  const {data:users} = useUsers();
  const dispatch = useDispatch();

  return (
    <Container>
      <Row>
        <h1>Project List</h1>
        <Button
          onClick={() => dispatch(projectListActions.openProjectModal())}
        >Create Project
        </Button>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
      <List
        refresh={retry}
        dataSource={list || []}
        loading={isLoading}
        users={users || []}
      />
    </Container>)
}



const Container = styled.div`
  padding: 3.2rem;
`

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`
