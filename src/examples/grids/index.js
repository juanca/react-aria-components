/* global window:false */

import '@babel/polyfill'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';
import { render } from 'react-dom';

import Example1 from './example-1.js';

render((
  <React.Fragment>
    <header>
      <h1>
        React ARIA Components - Grids
      </h1>
    </header>
    <a href="..">Go back to table of contents</a>
    <main>
      <Example1 />
    </main>
  </React.Fragment>
), window.document.getElementById('page'));
