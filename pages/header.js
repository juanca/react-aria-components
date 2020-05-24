import PropTypes from 'prop-types';
import React from 'react';

export default function Header(props) {
  return (
    <React.Fragment>
      <nav>
        <a href="./">List of Components</a>
        {props.title && (
          <React.Fragment>
            <span> / </span>
            <a href={props.link}>{props.title}</a>
          </React.Fragment>
        )}
      </nav>
      <header>
        <h1>
          React ARIA Components
        </h1>
        <p>
          Support this project by <a href="https://github.com/sponsors/juanca">becoming a sponsor</a>. {/* eslint-disable-line max-len */}
        </p>
      </header>
    </React.Fragment>
  );
}

Header.defaultProps = {
  link: undefined,
  title: undefined,
};

Header.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string,
};
