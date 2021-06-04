import {
  useEffect,
  useState as useReactState,
} from 'react';

const defaultOptions = {
  sync: false,
};

export default function useState(value, options = defaultOptions) {
  const [state, setState] = useReactState(value);

  if (options.sync) {
    useEffect(() => {
      setState(value);
    }, [value]);
  }

  return [state, setState];
}
