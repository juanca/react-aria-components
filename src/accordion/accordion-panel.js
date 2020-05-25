import React from 'react';
import PropTypes from 'prop-types';

export default function AccordionPanel(props) {
  return (
    <div>
      {props.children}
    </div>
  );
}

AccordionPanel.propTypes = {
  children: PropTypes.node,
};

AccordionPanel.defaultProps = {
  children: undefined,
};
