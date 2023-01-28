import { useEffect, useRef, useState } from "react";

export const isFalsy = (value: unknown) => value === 0 ? false : !value

export const cleanObject = (object:object) => {
  const result:{[key:string]:any} = {...object};
  Object.keys(result).forEach(key => {

    const value = result[key];
    if (isFalsy(value)) {

      delete result[key]
    }
  })
  return result
}

export const useMount = (callback:()=>void) => {
  useEffect( () => {
    callback();
  }, [])
}

export const useDebounce = <v>(value:v, delay?:number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value]);

  return debounceValue;
}

export const useDocumentTitle = (title: string, keepOnUnmount = true) => {
  const oldTitle = useRef(document.title).current;

  useEffect(()=>{
    document.title = title;
  }, []);

  // 要注意react闭包问题
  useEffect(() => {
    return () => {
      if (!keepOnUnmount) {
        document.title = oldTitle;
      }
    }
  },[])
}

export const resetRoute = () => {
  window.location.href = window.location.origin;
}
