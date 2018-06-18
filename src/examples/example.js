import PropTypes from 'prop-types';
import React from 'react';

export default function Example(props) {
  return (
    <React.Fragment>
      {props.children}
      <hr />
    </React.Fragment>
  );
};

Example.propTypes = {
  children: PropTypes.node,
};
