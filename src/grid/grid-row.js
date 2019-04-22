import PropTypes from 'prop-types';
import React from 'react';

const styles = {
  display: 'flex',
  flexDirection: 'row',
};

export default class Row extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      this.props.active === true
      || this.props.active !== nextProps.active
    );
  }

  render() {
    return (
      <div className={this.props.className} role="row" style={styles}>
        {React.Children.map(this.props.children, (cell, index) => (
          React.cloneElement(cell, {
            active: this.props.active && index === this.props.cellIndex,
          })
        ))}
      </div>
    );
  }
}

Row.propTypes = {
  active: PropTypes.bool.isRequired,
  cellIndex: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

Row.defaultProps = {
  className: undefined,
};
