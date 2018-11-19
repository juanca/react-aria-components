import React from 'react';

export default class Cursor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      position: -1,
    };
  }

  render() {
    return (
      <div>
        {this.props.children(this.state.position)}
      </div>
    );
  }
};
