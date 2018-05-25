import React from 'react';

import styles from './tree-grid.css'

export default function TreeGrid(props) {
  return (
    <div className={styles.container}>
      <div className={styles['header-row']}>
        <div className={styles.hc0}>HEAD0</div>
        <div className={styles.c1}>HEAD1</div>
        <div className={styles.c2}>HEAD2</div>
        <div className={styles.c3}>HEAD3</div>
        <div className={styles.c4}>HEAD4</div>
      </div>
      <div>
        <div className={styles.row}>
          <div className={styles.c0}>B0</div>
          <div className={styles.c1}>B0</div>
          <div className={styles.c2}>B0</div>
          <div className={styles.c3}>B0</div>
          <div className={styles.c4}>B0</div>
        </div>
        <div className={styles.row}>
          <div className={styles.c0}>B1</div>
          <div className={styles.c1}>B1</div>
          <div className={styles.c2}>B1</div>
          <div className={styles.c3}>B1</div>
          <div className={styles.c4}>B1</div>
        </div>
        <div className={styles.row}>
          <div className={styles.c0}>B2</div>
          <div className={styles.c1}>B2</div>
          <div className={styles.c2}>B2</div>
          <div className={styles.c3}>B2</div>
          <div className={styles.c4}>B2</div>
        </div>
        <div className={styles.row}>
          <div className={styles.c0}>B3</div>
          <div className={styles.c1}>B3</div>
          <div className={styles.c2}>B3</div>
          <div className={styles.c3}>B3</div>
          <div className={styles.c4}>B3</div>
        </div>
      </div>
    </div>
  );
};
