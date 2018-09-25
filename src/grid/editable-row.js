import PropTypes from 'prop-types';
import React from 'react';

import GridContext from './grid-context.js';
import Row from './row.js';

class EditableRow extends React.Component {
  constructor(props) {
    super(props);

    this.rowRef = React.createRef();

    this.onBlur = this.onBlur.bind(this);
    // this.onClick = this.onClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);

    this.state = {
      editing: false,
    };
  }

  onBlur(event) {
    const focusWithinRow = this.rowRef.current.contains(event.relatedTarget);

    if (!focusWithinRow) {
      this.setState({ editing: false });
    }
  }

  onKeyDown(event) {
    switch (event.key) {
      case 'Enter': {
        event.preventDefault();
        this.setState({ editing: true });
        break;
      }
      case 'Escape': {
        event.preventDefault();
        this.setState({ editing: false });
        break;
      }
      default: break;
    }
  }

  render() {
    return (
      <Row
        {...this.props}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onKeyDown={this.onKeyDown}
        rowRef={this.rowRef}
      >
        {this.props.children(this.state.editing)}
      </Row>
    );
  }
}

EditableRow.defaultProps = {
};

EditableRow.propTypes = {
  children: PropTypes.func.isRequired,
};

export default function FocusableEditableRow(props) {
  const {
    idY,
  } = props;

  return (
    <GridContext.Consumer>
      {gridRefs => <EditableRow
        {...props}
        gridRefs={gridRefs}
        rowRefs={gridRefs[idY]}
      />}
    </GridContext.Consumer>
  );
}
