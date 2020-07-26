import {
  useRef as useRefHook,
} from 'react';

export default function useRef(ref) {
  const backupRef = useRefHook();

  return ref || backupRef;
}
