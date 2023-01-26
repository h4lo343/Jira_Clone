import { User } from "../screens/project-list/search-panel";
import { useAsync } from "./use-async";
import { Project } from "../screens/project-list/list";
import { useHttp } from "./http";
import { useEffect } from "react";
import { cleanObject } from "./index";

export const useUsers = (param?: Partial<User>) => {
  const {run, ...result} = useAsync<User[]>();
  const client = useHttp();

  useEffect(() => {
    run( client("users", {data: cleanObject(param || {})}));
  }, []);

  return result;
}
