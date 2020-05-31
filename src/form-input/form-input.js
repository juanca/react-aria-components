import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import PropTypes from 'prop-types';

const FormInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
  }));

  return (
    <React.Fragment>
      <label htmlFor={props.id}>{props.label}</label>
      <input id={props.id} ref={inputRef} />
    </React.Fragment>
  );
});

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,

};

FormInput.defaultProps = {
};

export default FormInput;
