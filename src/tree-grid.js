import React from 'react';

import Grid from './grid.js';
import styles from './tree-grid.css'

export default function TreeGrid(props) {
  return (
    <div className={styles.container}>
      <div className={styles['header-row']}>
        <div className={styles.hc0}>HEAD0</div>
        <div className={styles.hc1}>HEAD1</div>
        <div className={styles.hc2}>HEAD2</div>
        <div className={styles.hc3}>HEAD3</div>
        <div className={styles.hc4}>HEAD4</div>
      </div>
      <div>
        <Grid />
        <Grid />
        <Grid />
        <Grid />
        <Grid />
        <Grid />
      </div>
    </div>
  );
};
