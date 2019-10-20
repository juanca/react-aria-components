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
      <header>
        <Heading root={props.root} title={props.title} />
        <p>
          Support this project by <a href="https://github.com/sponsors/juanca">becoming a sponsor</a>. {/* eslint-disable-line max-len */}
        </p>
      </header>
      {!props.root && (
        <nav>
          <a href="..">Go back to table of contents</a>
        </nav>
      )}
    </React.Fragment>
  );
}

Header.defaultProps = {
  root: false,
  title: undefined,
};

Header.propTypes = {
  root: PropTypes.bool,
  title: PropTypes.string,
};
