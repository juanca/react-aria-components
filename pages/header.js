import PropTypes from 'prop-types';
import React from 'react';

export default function Header(props) {
  return (
    <React.Fragment>
      <nav>
        <a href="./">List of Components</a>
        <span> / </span>
        <a href={props.link}>{props.title}</a>
      </nav>
      <header>
        <h1>
          React ARIA Components - {props.title}
        </h1>
      </header>
    </React.Fragment>
  );
}

Header.defaultProps = {
};

Header.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
