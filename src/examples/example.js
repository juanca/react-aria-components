import PropTypes from 'prop-types';
import React from 'react';

export default function Example(props) {
  return (
    <section>
      <h1>{props.title}</h1>
      {props.children}
      <hr />
    </section>
  );
};

Example.propTypes = {
  children: PropTypes.node,
  title: PropTypes.node.isRequired,
};
