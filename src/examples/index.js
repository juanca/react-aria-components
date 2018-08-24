/* global window:false */

import 'babel-polyfill'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';
import { render } from 'react-dom';

import Examples from './examples.js';

setTimeout(() => {
  render(<Examples />, window.document.getElementById('page'));
}, 100);
