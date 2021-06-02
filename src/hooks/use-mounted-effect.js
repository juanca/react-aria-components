import { useEffect } from 'react';
import useMounted from './use-mounted.js';

export default function useMountedEffect(callback, dependencies) {
  const mounted = useMounted();

  useEffect(function useMountedEffectCallback() {
    if (!mounted) return;

    callback();
  }, dependencies);
};
