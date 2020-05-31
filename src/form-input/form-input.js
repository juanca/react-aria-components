import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import PropTypes from 'prop-types';
import styles from './form-input.css';

const FormInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current.focus(),
  }));

  return (
    <React.Fragment>
      <label
        className={props.classLabel}
        htmlFor={props.id}
      >
        {props.label}
      </label>
      <input
        className={props.classInput}
        id={props.id}
        ref={inputRef}
      />
    </React.Fragment>
  );
});

FormInput.propTypes = {
  classLabel: PropTypes.string,
  classInput: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
};

FormInput.defaultProps = {
  classLabel: styles.label,
  classInput: styles.input,
};

export default FormInput;
