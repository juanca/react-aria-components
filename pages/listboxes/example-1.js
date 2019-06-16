/* eslint-disable react/no-array-index-key */
import React from 'react';

import Example from '../example.js';
import Listbox from '../../src/listbox/index.js';
import Option from '../../src/listbox/option.js';
import styles from './example-1.css';

const list = [
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

const refs = list.map(() => React.createRef());

export default function ListboxExample1() {
  return (
    <Example title="Scrollable Listbox Example">
      <div className={styles.container}>
        <span>
          Transuranium elements:
        </span>
        <Listbox className={styles.listbox} refs={refs}>
          {list.map((option, index) => (
            <Option
              key={option}
              className={styles.option}
              optionRef={refs[index]}
            >
              {option}
            </Option>
          ))}
        </Listbox>
      </div>

    </Example>
  );
}
