import React, { FormEvent } from 'react'

const apiUrl = process.env.REACT_APP_API_URL;

export const LoginScreen = () => {
  const login = (param:{username:string, password:string}) => {
    fetch(`${apiUrl}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(param)
    }).then(async response => {
      if(response.ok) {
         const message = await response.json();
         console.log(message);
      }
    })
  }

  const handleSubmit = (event: FormEvent<Element> ) => {
    event.preventDefault();

    const username = ( event.currentTarget.children[0] as HTMLInputElement).value;
    const password = ( event.currentTarget.children[1] as HTMLInputElement).value;

    login({username, password});

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
    <button type={'submit'}>Register</button>
  </form>
}
