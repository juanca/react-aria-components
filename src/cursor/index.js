import React from 'react';

export default class Cursor extends React.Component {
  render() {
    return (
      <div>
        {this.props.children()}
      </div>
    );
  }
};
