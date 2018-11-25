import React from 'react';

export default class Cell extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span>
        {this.props.active ? 'cell!' : 'cell'}
      </span>
    );
  }
}
