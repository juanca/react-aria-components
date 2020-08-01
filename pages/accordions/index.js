/* global window:false */

import React from 'react';
import { render } from 'react-dom';

import Example1 from './example-1.js';
import Footer from '../footer.js';
import Header from '../header.js';

render((
  <React.Fragment>
    <Header link="./accordions" title="Accordion" />
    <main>
      <p>
        <a href="https://www.w3.org/TR/wai-aria-practices-1.1/#accordion">
          WAI-ARIA Authoring Practices 1.1 - Accordion
        </a>
      </p>
      <Example1 />
    </main>
    <Footer />
  </React.Fragment>
), window.document.getElementById('page'));
