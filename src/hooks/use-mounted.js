import {
  useEffect,
  useRef,
} from 'react';

export default function useDidMount() {
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
  }, []);

  return mounted.current;
}
