import React from 'react';

import Cell from './cell.js';
import Grid from './grid.js';
import styles from './tree-grid.css'

export default function TreeGrid(props) {
  return (
    <div className={styles.container}>
      <div className={styles['header-row']}>
        <Cell className={styles.hc0}>HEAD0</Cell>
        <Cell className={styles.hc1}>HEAD1</Cell>
        <Cell className={styles.hc2}>HEAD2</Cell>
        <Cell className={styles.hc3}>HEAD3</Cell>
        <Cell className={styles.hc4}>HEAD4</Cell>
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
