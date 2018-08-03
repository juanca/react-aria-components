import React from 'react';
import PropTypes from 'prop-types';

export default function Accordion({ children }) {
  return (
    <div>
      { children }
    </div>
  );
}

Accordion.propTypes = {
  children: PropTypes.node.isRequired,
};
