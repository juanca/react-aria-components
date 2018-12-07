import React from 'react';

const styles = {
  display: 'flex',
  flexDirection: 'row',
};

export default class Row extends React.Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.active === true ||
      this.props.active !== nextProps.active
    );
  }

  render() {
    return (
      <div style={styles}>
        {React.Children.map(this.props.children, (cell, index) => (
          React.cloneElement(cell, { active: this.props.active && index === this.props.cellIndex })
        ))}
      </div>
    );
  }
}
