/* global window:false */

import '@babel/polyfill'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';
import { render } from 'react-dom';

import Example1 from './example-1.js';
import Example2 from './example-2.js';
import Footer from '../footer.js';
import Header from '../header.js';

render((
  <React.Fragment>
    <Header title="Listboxes" />
    <main>
      <Example1 />
      <Example2 />
    </main>
    <Footer />
  </React.Fragment>
), window.document.getElementById('page'));
