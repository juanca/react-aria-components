/* global window:false */

import React from 'react';
import { render } from 'react-dom';

import Header from './header.js';
import Example from './example.js';
import Footer from './footer.js';

setTimeout(() => {
  render((
    <React.Fragment>
      <Header />
      <Example title="Table of Contents">
        <nav>
          <p>
            List of WAI-ARIA components implemented in React:
          </p>
          <ol>
            <li><a href="./forms">Forms</a></li>
            <li><a href="./grids">Grid</a></li>
            <li><a href="./tabs">Tabs</a></li>
          </ol>
        </nav>
      </Example>
      <Footer />
    </React.Fragment>
  ), window.document.getElementById('page'));
}, 100);
