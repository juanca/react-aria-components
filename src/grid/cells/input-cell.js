import PropTypes from 'prop-types';
import React from 'react';

import GridCell from '../grid-cell.js';
import styles from './input-cell.css';

export default function InputCell(props) {
  return (
    <GridCell cellRef={props.cellRef} className={props.className} interactive>{/* eslint-disable-line max-len */}
      {(active, cellRef) => (
        <input tabIndex={active ? 0 : -1} ref={cellRef} value={props.value} />
      )}
    </GridCell>
  );
}

InputCell.propTypes = {
  cellRef: PropTypes.string.isRequired,
  className: PropTypes.string,
  value: PropTypes.string,
};

InputCell.defaultProps = {
  className: styles.container,
  value: '',
};
