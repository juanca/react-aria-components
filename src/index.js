import React from 'react';
import { render } from 'react-dom';

import styles from './index.css';

render((
  <div className={styles.container}>
    Hello world!
  </div>
), document.getElementById('example-0'));
