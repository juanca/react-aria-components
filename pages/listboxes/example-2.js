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
      selected: [],
    };

    this.containerRef = React.createRef();
    this.onBodyClick = this.onBodyClick.bind(this);
    this.onBodyFocus = this.onBodyFocus.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onDeselect = this.onDeselect.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    window.document.body.addEventListener('click', this.onBodyClick);
    window.document.body.addEventListener('focusin', this.onBodyFocus);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.expanded && this.state.expanded) {
      this.containerRef.current.focus();
    }
  }

  onBodyClick(event) {
    if (!this.containerRef.current.contains(event.target)) {
      this.setState({ expanded: false });
    }
  }

  onBodyFocus(event) {
    if (!this.containerRef.current.contains(event.target)) {
      this.setState({ expanded: false });
    }
  }

  onClick() {
    this.setState(state => ({ expanded: !state.expanded }));
  }

  onDeselect(selected) {
    this.setState(state => ({
      selected: state.selected.filter(ref => ref !== selected),
    }));
  }

  onSelect(selected) {
    this.setState({
      selected: [selected],
    });
  }

  render() {
    const selectedRefs = refs.filter(ref => this.state.selected.includes(ref));

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
              {selectedRefs.length > 0 ? selectedRefs[0].current.textContent : 'No selection'}{/* eslint-disable-line max-len */}
            </button>
            <Listbox
              className={this.state.expanded ? styles.listbox : styles.hidden}
              containerRef={this.containerRef}
              refs={refs}
            >
              {list.map((option, index) => (
                <Option
                  key={option}
                  className={styles.option}
                  onDeselect={this.onDeselect}
                  onSelect={this.onSelect}
                  optionRef={refs[index]}
                  selected={this.state.selected.includes(refs[index])}
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
