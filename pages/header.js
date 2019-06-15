import PropTypes from 'prop-types';
import React from 'react';

export default function Header(props) {
  return (
    <React.Fragment>
      <header>
        <h1>
          React ARIA Components - {props.title}
        </h1>
      </header>
      <nav>
        <a href="..">Go back to table of contents</a>
      </nav>
    </React.Fragment>
  );
}

Header.defaultProps = {
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
