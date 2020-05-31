import React, {
  forwardRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';

const FormInput = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => {
  });

  return (
    <React.Fragment>
      <label htmlFor={props.id}>{props.label}</label>
      <input id={props.id} />
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
