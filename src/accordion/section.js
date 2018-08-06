import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from '../utils/unique-id.js';
import styles from './section.css';

export default class Section extends React.Component {
  constructor() {
    super();
    this.accessibleId = uniqueId();
  }

  render() {
    const {
      cannotClose,
      children,
      cssContainer,
      cssPanel,
      cssTrigger,
      onClick,
      open,
      title,
    } = this.props;
    const titleVal = typeof title === 'function' ? title({ open }) : title;

    return (
      <div className={cssContainer}>
        <div role="heading">
          <button
            aria-controls={this.accessibleId}
            aria-disabled={cannotClose}
            aria-expanded={open}
            className={cssTrigger}
            type="button"
            onClick={onClick}
          >
            {titleVal}
          </button>
        </div>
        <div className={open ? cssPanel : undefined} id={this.accessibleId}>
          {open && children}
        </div>
      </div>
    );
  }
}

Section.propTypes = {
  cannotClose: PropTypes.bool,
  children: PropTypes.node.isRequired,
  cssContainer: PropTypes.string,
  cssPanel: PropTypes.string,
  cssTrigger: PropTypes.string,
  onClick: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

Section.defaultProps = {
  cannotClose: undefined,
  cssContainer: styles.container,
  cssPanel: styles.panel,
  cssTrigger: styles.trigger,
  onClick: undefined,
  open: false,
  title: undefined,
};
