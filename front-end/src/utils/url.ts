import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { cleanObject } from "./index";

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
      }
      ,
      [searchParams]),
    (params: Partial<{[key in K]: unknown}>) => {
      const o = cleanObject({...Object.fromEntries(searchParams), ...params})
      return setSearchParam(o)
    }
  ] as const;
};
