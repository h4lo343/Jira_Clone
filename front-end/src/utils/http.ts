import qs from "qs";
import * as auth from 'provider/auth-provider';
import { useAuth } from "../context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

// 这里使用了透传，透传fetch原本的config
interface Config extends RequestInit {
  token?:string,
  data?:object
}

// 这里使用了透传，透传fetch原本的config
export const http = async (endpoint: string, {data, token, headers, ...customConfig}: Config = {}) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      'Content-Type': data ? 'application/json' : "",
    },
    ...customConfig
  }

  if(config.method.toUpperCase()==='GET') {
    endpoint+=`?${qs.stringify(data)}`
  }else {
    config.body = JSON.stringify(data || {});
  }

  return window.fetch(`${apiUrl}/${endpoint}`, config)
    .then(async response => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({message:"please login again"});
      }
      const data = await response.json();
      if(response.ok) {
        return data
      }else {

        return Promise.reject(data).catch((error) => {
          console.log(error.message);
        })

          ;}
    })
}

export const useHttp = () => {
  const {user} = useAuth();
  return  (...[endpoint, config]:Parameters<typeof http>) => http(endpoint, {...config, token: user?.token})
}
