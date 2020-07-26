import {
  useEffect,
  useState as useReactState,
} from 'react';

export default function useState(initialState, onStateChange) {
  const [state, setState] = useReactState(initialState);

  useEffect(() => {
    setState(initialState);
  }, [initialState]);

  useEffect(() => {
    onStateChange();
  }, [state]);

  return [state, setState];
}
