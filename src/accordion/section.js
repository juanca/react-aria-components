import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from '../utils/unique-id.js';
import styles from './section.css';

const headings = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
};

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
      cssHeading,
      cssPanel,
      cssTrigger,
      headingLevel,
      onClick,
      open,
      title,
    } = this.props;
    const titleVal = typeof title === 'function' ? title({ open }) : title;
    const Heading = headings[headingLevel];

    if (!Heading) {
      throw new Error('Accordion must have a headingLevel between 1 and 6');
    }

    return (
      <div className={cssContainer}>
        <Heading className={cssHeading}>
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
        </Heading>
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
  cssHeading: PropTypes.string,
  cssPanel: PropTypes.string,
  cssTrigger: PropTypes.string,
  headingLevel: PropTypes.oneOf([1, 2, 3, 4, 5, 6]).isRequired,
  onClick: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

Section.defaultProps = {
  cannotClose: undefined,
  cssContainer: styles.container,
  cssHeading: styles.heading,
  cssPanel: styles.panel,
  cssTrigger: styles.trigger,
  onClick: undefined,
  open: false,
  title: undefined,
};
