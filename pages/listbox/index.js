/* global window:false */

import '@babel/polyfill'; // eslint-disable-line import/no-extraneous-dependencies
import React, {
  useRef,
} from 'react';
import { render } from 'react-dom';

import Listbox from '../../src/listbox/listbox.js';
import ListOption from '../../src/list-option/list-option.js';
import Footer from '../footer.js';
import Header from '../header.js';

function ScrollableListExample() {
  const options = [
    'Neptunium',
    'Plutonium',
    'Americium',
    'Curium',
    'Berkelium',
    'Californium',
    'Einsteinium',
    'Fermium',
    'Mendelevium',
    'Nobelium',
    'Lawrencium',
    'Rutherfordium',
    'Dubnium',
    'Seaborgium',
    'Bohrium',
    'Hassium',
    'Meitnerium',
    'Darmstadtium',
    'Roentgenium',
    'Copernicium',
    'Nihonium',
    'Flerovium',
    'Moscovium',
    'Livermorium',
    'Tennessine',
    'Oganesson',
  ];
  const refs = options.map(() => useRef());

  return (
    <section>
      <h2>Scrollable Listbox Example</h2>
      <label id="scrollable-list-example-label">
        Transuranium elements:
      </label>
      <Listbox
        labelledBy="scrollable-list-example-label"
        refs={refs}
      >
        {options.map((option, index) => (
          <ListOption key={option} ref={refs[index]}>
            {option}
          </ListOption>
        ))}
      </Listbox>
    </section>
  );
}

render((
  <React.Fragment>
    <Header link="./listbox" title="Listbox" />
    <main>
      <ScrollableListExample />
    </main>
    <Footer />
  </React.Fragment>
), window.document.getElementById('page'));
