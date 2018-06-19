import PropTypes from 'prop-types';
import React from 'react';

export default function Slider(props) {
  return (
    <React.Fragment>
      {props.children}
    </React.Fragment>
  );
};

Slider.propTypes = {
  children: PropTypes.node,
};
