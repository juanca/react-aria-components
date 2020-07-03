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
import styles from './styles.css';

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
      <p>
        Choose your favorite transuranic element (actinide or transactinide).
      </p>
      <div className={styles['scrollable-example-container']}>
        <label id="scrollable-list-example-label">
          Transuranium elements:
        </label>
        <Listbox
          className={styles['scrollable-example-listbox']}
          labelledBy="scrollable-list-example-label"
          refs={refs}
        >
          {options.map((option, index) => (
            <ListOption
              className={styles['scrollable-example-option']}
              key={option}
              ref={refs[index]}
            >
              {option}
            </ListOption>
          ))}
        </Listbox>
      </div>
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
