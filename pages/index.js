/* global window:false */

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';

import Example from './example.js';
import Footer from './footer.js';

setTimeout(() => {
  render((
    <React.Fragment>
      <header>
        <h1>
          React ARIA Components
        </h1>
      </header>
      <Example title="Table of Contents">
        <nav>
          <p>
            List of WAI-ARIA components implemented in React:
          </p>
          <ol>
            <li><a href="./accordions">Accordion</a></li>
            <li><a href="./grids">Grid</a></li>
            <li><a href="./tabs">Tabs</a></li>
          </ol>
        </nav>
      </Example>
      <Footer />
    </React.Fragment>
  ), window.document.getElementById('page'));
}, 100);
