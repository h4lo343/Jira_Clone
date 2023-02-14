import { User } from "../types/user";

const localStorageKey = '__auth_provider_token__';
const apiUrl = process.env.REACT_APP_API_URL;

export const  getToken = () => window.localStorage.getItem(localStorageKey);


export const handleUserResponse = ({user}:{user:User}) => {
  window.localStorage.setItem(localStorageKey, user.token || '');
  return user;
}

export const login = async (data: {name: string, password: string}) => {
  return fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(async response => {
    if(response.ok) {
      return handleUserResponse(await response.json())
    }else {
      return Promise.reject(await response.json());
    }
  })
}

export const register = (data: {name: string, password: string}) => {
  return fetch(`${apiUrl}/auth/register`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(async response => {
    if(response.ok) {
      return handleUserResponse(await response.json())
    }
    else {
      return Promise.reject(await response.json())
    }
  })
}

export const logout = async () => window.localStorage.removeItem(localStorageKey);

