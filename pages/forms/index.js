/* global window:false */

import '@babel/polyfill'; // eslint-disable-line import/no-extraneous-dependencies
import React from 'react';
import { render } from 'react-dom';

import FormInput from '../../src/form-input/form-input.js';
import FormSelect from '../../src/form-select/form-select.js';
import Footer from '../footer.js';
import Header from '../header.js';

render((
  <React.Fragment>
    <Header link="./forms" title="Forms" />
    <main>
      <section>
        <h2>Form Input Example</h2>
        <FormInput id="example-1" label="This is a label" />
      </section>
      <section>
        <h2>Form Select Example</h2>
        <FormSelect id="example-2" label="This is a label">
          <option>Default option</option>
          <option>Another option</option>
          <option>Hello world!</option>
        </FormSelect>
      </section>
    </main>
    <Footer />
  </React.Fragment>
), window.document.getElementById('page'));
