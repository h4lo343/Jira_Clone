
import { useAsync } from "./use-async";
import { useHttp } from "./http";
import { useEffect } from "react";
import { cleanObject } from "./index";
import { Project } from "../types/project";
import { User } from "../types/user";

export const useUsers = (param?: Partial<User>) => {
  const {run, ...result} = useAsync<User[]>();
  const client = useHttp();

  useEffect(() => {
    run( client("users", {data: cleanObject(param || {})}));

  }, []);

  return result;
}
