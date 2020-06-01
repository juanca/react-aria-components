import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import PropTypes from 'prop-types';

const FormSelect = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
  }));

  return (
    <React.Fragment>
      <label
        htmlFor={props.id}
      >
        {props.label}
      </label>
      <select
        id={props.id}
        ref={inputRef}
      >
        {props.children}
      </select>
    </React.Fragment>
  );
});

FormSelect.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

FormSelect.defaultProps = {
  children: undefined,
};

export default FormSelect;
