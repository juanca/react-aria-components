import React from 'react';
import PropTypes from 'prop-types';

export default function AccordionHeader(props) {
  return (
    <button htmlFor={props.htmlFor} type="button" onClick={props.onClick}>
      {props.children}
    </button>
  );
}

AccordionHeader.propTypes = {
  children: PropTypes.node,
  htmlFor: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

AccordionHeader.defaultProps = {
  children: undefined,
};
