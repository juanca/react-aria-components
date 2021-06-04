import {
  useEffect as useReactEffect
} from 'react';
import useMounted from './use-mounted.js';

const defaultOptions = {
  mounted: false,
};

export default function useEffect(callback, dependencies, options = defaultOptions) {
  const mounted = options.mounted ? useMounted() : true;

  useReactEffect(() => {
    if (!mounted) return;

    callback();
  }, dependencies);
};
