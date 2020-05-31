/* global window:false */

import '@babel/polyfill'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';
import { render } from 'react-dom';

import FormInput from '../../src/form-input/form-input.js';
import Footer from '../footer.js';
import Header from '../header.js';

render((
  <React.Fragment>
    <Header link="./forms" title="Forms" />
    <main>
      <FormInput id="example-1" label="This is a label">Example 1?</FormInput>
    </main>
    <Footer />
  </React.Fragment>
), window.document.getElementById('page'));
