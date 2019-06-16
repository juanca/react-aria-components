import React from 'react';

import Example from '../example.js';
import styles from './example-2.css';

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
          </div>
        </div>
      </Example>
    );
  }
}
