/* eslint-disable react/no-array-index-key */
import React from 'react';

import Example from '../example.js';
import styles from './example-2.css';

export default function ListboxExample1() {
  return (
    <Example title="Collapsible Dropdown Listbox Example">
      <div className={styles.container}>
        <span>Choose an element:</span>
        <div className={styles.wrapper}>
          <button
            aria-haspopup="listbox"
            className={styles.button}
            type="button"
          >
            Neptunium
          </button>
        </div>
      </div>
    </Example>
  );
}
