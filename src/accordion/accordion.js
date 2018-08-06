import React from 'react';
import PropTypes from 'prop-types';
import styles from './accordion.css';

export default function Accordion({ children, className }) {
  return (
    <div className={className}>
      { children }
    </div>
  );
}

Accordion.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Accordion.defaultProps = {
  className: styles.container,
};
