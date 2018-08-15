/* global window:false */

import 'babel-polyfill'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';
import { render } from 'react-dom';

import Tabs from './tabs.js';

render((
  <Tabs />
), window.document.getElementById('page'));
