import React from 'react';

import Example from '../example.js';
import Listbox from '../../src/listbox/index.js';
import Option from '../../src/listbox/option.js';
import styles from './example-2.css';

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

export default class ListboxExample2 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState(state => ({ expanded: !state.expanded }));
  }

  render() {
    return (
      <Example title="Collapsible Dropdown Listbox Example">
        <div className={styles.container}>
          <span>Choose an element:</span>
          <div className={styles.wrapper}>
            <button
              aria-expanded={this.state.expanded}
              aria-haspopup="listbox"
              className={styles.button}
              onClick={this.onClick}
              type="button"
            >
              Neptunium
            </button>
            <Listbox className={this.state.expanded ? styles.listbox : styles.hidden} refs={refs}>
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
        </div>
      </Example>
    );
  }
}
