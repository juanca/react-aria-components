import {
  useRef as useReactRef,
} from 'react';

const defaultOptions = {
  forwarded: false,
};

export default function useRef(value, options = defaultOptions) {
  if (options.forwarded) {
    const backupRef = useReactRef();
    return value || backupRef;
  }

  return useReactRef(value);
}
