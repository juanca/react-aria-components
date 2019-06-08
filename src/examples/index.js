/* global window:false */

import '@babel/polyfill'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';
import { render } from 'react-dom';

import Example from './example.js';
import AccordionExample from './accordion-example.js';
import Footer from './footer.js';
import TabsExample from './tabs-example.js';

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
            <li>
              <a href="./grids">Grid</a>
            </li>
            <li>
              Tabs
            </li>
          </ol>
        </nav>
      </Example>
      <main>
        <TabsExample />
        <AccordionExample />
      </main>
      <Footer />
    </React.Fragment>
  ), window.document.getElementById('page'));
}, 100);
