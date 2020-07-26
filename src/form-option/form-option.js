import React, {
  forwardRef,
} from 'react';
import ListOption from '../list-option/list-option.js';
import useRef from '../hooks/use-ref.js';

const FormOption = forwardRef(function FormOption(props, forwardedRef) {
  const ref = useRef(forwardedRef);

  return <ListOption {...props} ref={ref} />;
});

export default FormOption;
