import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from '../utils/unique-id.js';

export default class Section extends React.Component {
  constructor() {
    super();
    this.accessibleId = uniqueId();
  }

  render() {
    const {
      cannotClose,
      children,
      onClick,
      open,
      title,
    } = this.props;
    const titleVal = typeof title === 'function' ? title({ open }) : title;

    return (
      <div>
        <div role="heading">
          <button
            aria-controls={this.accessibleId}
            aria-disabled={cannotClose}
            aria-expanded={open}
            type="button"
            onClick={onClick}
          >
            {titleVal}
          </button>
        </div>
        <div id={this.accessibleId}>
          {open && children}
        </div>
      </div>
    );
  }
}

Section.propTypes = {
  cannotClose: PropTypes.bool,
  children: PropTypes.node.isRequired,
  open: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  onClick: PropTypes.func,
};

Section.defaultProps = {
  cannotClose: undefined,
  open: false,
  title: undefined,
  onClick: undefined,
};
