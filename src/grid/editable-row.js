import PropTypes from 'prop-types';
import React from 'react';

import GridContext from './grid-context.js';
import Row from './row.js';

class EditableRow extends React.Component {
  constructor(props) {
    super(props);

    this.rowRef = React.createRef();

    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);

    this.state = {
      cursorX: -1,
      editing: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.editing && this.state.editing) {
      this.props.rowRefs[this.state.cursorX].current.focus();
    }
  }

  onBlur(event) {
    const focusWithinRow = this.rowRef.current.contains(event.relatedTarget);

    if (!focusWithinRow) {
      this.setState({ editing: false });
    }
  }

  onFocus(event) {
    const cursorX = this.props.rowRefs.findIndex(cellRef => cellRef.current === event.target);

    if (this.state.cursorX !== cursorX) {
      this.setState({
        cursorX,
        editing: true,
      });
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
        {this.props.children(this.state.editing, this.state.cursorX)}
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
      {gridRefs => (
        <EditableRow
          {...props}
          gridRefs={gridRefs}
          rowRefs={gridRefs[idY]}
        />
      )}
    </GridContext.Consumer>
  );
}
