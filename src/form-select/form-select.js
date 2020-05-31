import React, {
  forwardRef,
  useImperativeHandle,
} from 'react';
import PropTypes from 'prop-types';

const FormSelect = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
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
