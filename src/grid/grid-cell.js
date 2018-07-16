import PropTypes from 'prop-types';
import React from 'react';

import GridContext from './grid-context.js';
import RefType from '../prop-types/ref.js';

import styles from './grid-cell.css';

class GridCell extends React.Component {
  constructor(props) {
    super(props);

    this.onBlur = this.onBlur.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onFocus = this.onFocus.bind(this);

    this.state = {
      tabIndex: -1,
    };
  }

  onBlur(event) {
    const focusWithinGrid = this.props.gridCellRefs.some(rows => (
      rows.some(cellRef => cellRef.current === event.relatedTarget)
    ));

    if (focusWithinGrid) this.setState({ tabIndex: -1 });
  }

  onClick() {
    this.props.onClick();
  }

  onFocus() {
    this.setState({ tabIndex: 0 });
  }

  render() {
    return (
      <div // eslint-disable-line jsx-a11y/no-static-element-interactions
        className={this.props.className}
        onBlur={this.onBlur}
        onClick={this.onClick}
        onFocus={this.onFocus}
        onKeyDown={() => {}}
        ref={this.props.gridCellRef}
        role={this.props.role}
        tabIndex={this.state.tabIndex}
      >
        {this.props.children}
      </div>
    );
  }
}

export default function FocusableGridCell(props) {
  const {
    idX,
    idY,
  } = props;

  return (
    <GridContext.Consumer>
      {gridRefs => <GridCell {...props} gridCellRefs={gridRefs} gridCellRef={gridRefs[idY][idX]} />}
    </GridContext.Consumer>
  );
}

GridCell.defaultProps = {
  className: styles.container,
  role: 'gridcell',
};

GridCell.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  gridCellRef: RefType.isRequired,
  gridCellRefs: PropTypes.arrayOf(PropTypes.arrayOf(RefType)).isRequired,
  role: PropTypes.oneOf(['columnheader', 'gridcell']),
};

FocusableGridCell.propTypes = {
  idX: PropTypes.number.isRequired,
  idY: PropTypes.number.isRequired,
};
