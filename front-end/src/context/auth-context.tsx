import React, { ReactNode, useState } from "react";
import * as auth from "../provider/auth-provider"
import { User } from "../screens/project-list/search-panel";
import { http } from "../utils/http";
import { useMount } from "../utils";
import { useAsync } from "../utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "../components/lib";

interface AuthForm {
  name: string,
  password: string
}

const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if(token) {
    const data = await http('auth/me', {data:{token}});
    user = data;
    return user;
  }
}

const AuthContext = React.createContext<{
  user: User | null,
  register: (form:AuthForm) => Promise<void>,
  login: (form:AuthForm) => Promise<void>,
  logout: () => Promise<void>
} | undefined>(undefined);
AuthContext.displayName = "Authcontext";

export const AuthProvider = ({children}:{children:ReactNode}) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User>();

  const login = (form: AuthForm) => auth.login(form).then(user => setUser(user));
  const register = (form: AuthForm) => auth.register(form).then(user => setUser(user));
  const logout = () => auth.logout().then( () => { setUser(null)});

   useMount( () => {
    run(bootstrapUser());
  })

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />;
  }

  return <AuthContext.Provider value={{user, login, register, logout}}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if(!context) {
    throw new Error('useAuth must be used in the AuthProvider')
  }
  return context;
}
