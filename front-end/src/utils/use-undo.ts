import { useCallback, useState } from "react";


export const useUndo = <T>(initialPresent: T) => {

  const [state, setState] = useState<{
    past: T[],
    present: T,
    future: T[]
  }>({
    past: [],
    present: initialPresent,
    future: []
  })
  
  const undo = useCallback(() => {
    setState(currentState => {
      const {past, present, future} = currentState;
      if (past.length == 0 ) {
        return currentState
      }
      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future]
      }
    })
  }, [])

  const redo = () => {
    useCallback(
      () => {
        callback;
      },
      [input]
    );
    
  }

  const set = (newPresent: T) => {
    if(newPresent === present) {
      return;
    }
    setPast([...past, present]);
    setPresent(newPresent);
    setFuture([]);
  }

  const reset = (newPresent: T) => {
    setPast([]);
    setFuture([]);
    setPresent(newPresent);
  }

  return [
    {past, present, future},
    {set, reset, undo, redo, canUndo, canRedo}
  ]
}
