import PropTypes from 'prop-types';
import React from 'react';

export default function Example(props) {
  return (
    <section id={props.id}>
      <header>
        <h2>
          {props.title}
        </h2>
      </header>
      {props.children}
      <hr />
    </section>
  );
};

Example.propTypes = {
  children: PropTypes.node,
  id: PropTypes.string.isRequired,
  title: PropTypes.node.isRequired,
};
