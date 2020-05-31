import React from 'react';
import PropTypes from 'prop-types';

export default function FormInput(props) {
  return (
    <React.Fragment>
      <label htmlFor={props.id}>{props.label}</label>
      <input id={props.id} />
    </React.Fragment>
  );
}

FormInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,

};

FormInput.defaultProps = {
};
