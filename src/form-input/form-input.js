import React from 'react';
import PropTypes from 'prop-types';

export default function FormInput(props) {
  return (
    <div>{props.children}</div>
  );
}

FormInput.propTypes = {
  children: PropTypes.node,
};

FormInput.defaultProps = {
  children: undefined,
};
