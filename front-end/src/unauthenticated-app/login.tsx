import React, { FormEvent } from 'react'
import { useAuth } from "context/auth-context";



export const LoginScreen = () => {
  const {login, user} = useAuth();

  const handleSubmit = (event: FormEvent<Element> ) => {
    event.preventDefault();

    // @ts-ignore
    const name = ( event.currentTarget["0"] as HTMLInputElement).value;


    // @ts-ignore
    const password = ( event.currentTarget["1"] as HTMLInputElement).value;

    login({name, password});
  }
  return <form onSubmit={handleSubmit}>
    <div>
      <label htmlFor="username">User Name</label>
      <input type="text" id={'username'}/>
    </div>
    <div>
      <label htmlFor="password">Password</label>
      <input type="password" id={'password'}/>
    </div>
    <button type={'submit'}>Login</button>
  </form>
}
