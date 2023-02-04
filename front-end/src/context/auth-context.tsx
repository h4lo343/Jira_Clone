import React, { ReactNode, useCallback, useState } from "react";
import * as auth from "../provider/auth-provider"
import { User } from "../screens/project-list/search-panel";
import { http } from "../utils/http";
import { useMount } from "../utils";
import { useAsync } from "../utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "../components/lib";
import * as authStore from 'store/auth.slice';
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch } from "../store";
import { bootStrap, selectUser } from "store/auth.slice";

export interface AuthForm {
  name: string,
  password: string
}

export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if(token) {
    const data = await http('auth/me', {data:{token}});
    user = data;
    return user;
  }
}

export const AuthProvider = ({children}:{children:ReactNode}) => {
  const {
    error,
    isLoading,
    isIdle,
    isError,
    run,
  } = useAsync<User>();

  const dispatch: (...args: unknown[]) => Promise<User> = useAppDispatch();

   useMount( () => {
    run(dispatch(authStore.bootStrap()));
  })

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  return <div>
    {children}
  </div>;
}

export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<User> = useAppDispatch();
  const user = useSelector(selectUser);
  const login = useCallback((form: AuthForm) => dispatch(authStore.login(form)), [dispatch]);
  const register = useCallback((form: AuthForm) => dispatch(authStore.register(form)), [dispatch]);
  const logout = useCallback(() => dispatch(authStore.logout()), []);
  return {
    user,
    login,
    register,
    logout
  }
}
