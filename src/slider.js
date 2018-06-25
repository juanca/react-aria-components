import PropTypes from 'prop-types';
import React from 'react';

import styles from './slider.css';

export default function Slider(props) {
  return (
    <div className={styles.rail}>
      <div
        aria-valuemin={props.valueMin}
        aria-valuenow={props.valueNow}
        aria-valuemax={props.valueMax}
        className={styles.thumb}
        role="slider"
        tabindex="0"
      />
    </div>
  );
};

Slider.defaultProps = {
  valueMin: 0,
  valueNow: 0,
  valueMax: 1,
};

Slider.propTypes = {
  children: PropTypes.node,
};
