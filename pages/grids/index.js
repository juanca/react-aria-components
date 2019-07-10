/* global window:false */

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import { render } from 'react-dom';

import Example1 from './example-1.js';
import Footer from '../footer.js';
import Header from '../header.js';

render((
  <React.Fragment>
    <Header title="Grids" />
    <main>
      <Example1 />
    </main>
    <Footer />
  </React.Fragment>
), window.document.getElementById('page'));
