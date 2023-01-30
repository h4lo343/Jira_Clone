import { useUrlQueryParam } from "../../utils/url";
import { useMemo } from "react";

export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  // 因为可能用户不输入param，这个时候Number(null)可能为0，所以要加上 ||undefined
  return [
    useMemo(() => { return {...param, personId: Number(param.personId) || undefined}}, [param]),
    setParam
  ] as const
}
