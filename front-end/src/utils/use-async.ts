import { useCallback, useState } from "react";
import { useMountedRef } from "./index";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
  stat: 'idle',
  data: null,
  error: null
}

export const  useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  });
  const mountedRef = useMountedRef();
  const [retry, setRetry] = useState(()=>()=>{})

  const setData = (data: D | null) => setState({
    data,
    stat: "success",
    error: null
  })

  const setError = (error: Error) => setState({
    error,
    stat: 'error',
    data: null
  })

  const run = useCallback(
    (promise: Promise<D>, runConfig?: {retry: ()=> Promise<D>}) => {
      if(!promise || !promise.then) {
        throw new Error('Please pass promise')
      }
      setRetry(()=>()=> {
        if(runConfig?.retry())
          run(runConfig.retry(),runConfig)
      })

      setState({...state, stat: 'loading'});
      return promise.then(data => {
        if (mountedRef.current) {
          setData(data);
        }
        return data;
      }).catch(error => {
        setError(error);
        return Promise.reject(error);
      })
    },
    []
  );




  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === 'loading',
    isError: state.stat === 'error',
    isSuccess: state.stat === 'success',
    run,
    setData,
    setError,
    // retry被调用时重新跑一遍run
    retry,
    ...state
  }
}
