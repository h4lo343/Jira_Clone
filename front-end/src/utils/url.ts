import { useSearchParams, URLSearchParamsInit } from "react-router-dom";
import { useMemo } from "react";
import { cleanObject } from "./index";

// https://stackoverflow.com/questions/52085454/typescript-define-a-union-type-from-an-array-of-strings
// the second answer clarifies the type question here 
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams();
  return [
    useMemo(
      () => {
        return keys.reduce(
          (prev, key) => {
            return { ...prev, [key]: searchParams.get(key)};
          }
          , {} as { [key in K]: string });
      },
      [searchParams]),
    (params: Partial<{[key in K]: unknown}>) => {
      const o = cleanObject({...Object.fromEntries(searchParams), ...params})
      return setSearchParam(o)
    }
  ] as const;
};


export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParam(o);
  };
};
