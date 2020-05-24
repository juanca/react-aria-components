import PropTypes from 'prop-types';
import React from 'react';

function Heading(props) {
  return props.root ? (
    <h1>
      React ARIA Components
    </h1>
  ) : (
    <h1>
      React ARIA Components - {props.title}
    </h1>
  );
}

Heading.propTypes = {
  root: PropTypes.bool,
  title: PropTypes.string,
};

Heading.defaultProps = {
  root: false,
  title: undefined,
};

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
        <Heading root={props.root} title={props.title} />
        <p>
          Support this project by <a href="https://github.com/sponsors/juanca">becoming a sponsor</a>. {/* eslint-disable-line max-len */}
        </p>
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
