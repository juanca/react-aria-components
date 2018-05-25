import React from 'react';

import Cell from './cell.js';
import styles from './grid.css';

export default function Grid(props) {
  return (
    <div className={styles.container}>
      <Cell className={styles.c0}>B0</Cell>
      <Cell className={styles.c1}>B0</Cell>
      <Cell className={styles.c2}>B0</Cell>
      <Cell className={styles.c3}>B0</Cell>
      <Cell className={styles.c4}>B0</Cell>
    </div>
  );
};
