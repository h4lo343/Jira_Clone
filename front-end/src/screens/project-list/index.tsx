import { SearchPanel } from "./search-panel";
import { List } from "./list";
import {useState, useEffect} from 'react';
import { cleanObject, useDebounce, useDocumentTitle, useMount } from "../../utils/index";
import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useAsync } from "../../utils/use-async";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { useUrlQueryParam } from "../../utils/url";
import { useProjectModal, useProjectSearchParams } from "./util";
import { Project } from "../../types/project";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  useDocumentTitle("Project List", false);
  const {open} = useProjectModal();
  const [param, setParam] = useProjectSearchParams();
  const debouncedParam = useDebounce(param, 1000);
  const {isLoading, error, data: list } = useProjects(debouncedParam);
  const {data:users} = useUsers();

  return (
    <Container>
      <Row>
        <h1>Project List</h1>
        <Button
          onClick={open}
          type={"link"}
        > Create Project </Button>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? <Typography.Text type={"danger"}>{error.message}</Typography.Text> : null}
      <List
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
