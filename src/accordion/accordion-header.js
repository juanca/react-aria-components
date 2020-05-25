import React from 'react';
import PropTypes from 'prop-types';

export default function AccordionHeader(props) {
  return (
    <button type="button">
      {props.children}
    </button>
  );
}

AccordionHeader.propTypes = {
  children: PropTypes.node,
};

AccordionHeader.defaultProps = {
  children: undefined,
};
