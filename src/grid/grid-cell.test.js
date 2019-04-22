import React from 'react';
import TestRenderer from 'react-test-renderer';

import GridCell from './grid-cell.js';

function render(props) {
  const cellRef = React.createRef();

  return TestRenderer.create((
    <GridCell active={false} cellRef={cellRef} {...props}>
      {active => (
        `Cell is ${active ? 'active' : 'inactive'}`
      )}
    </GridCell>
  ), {
    createNodeMock: () => ({
      focus: jest.fn(),
    }),
  });
}

test('renders the default state', () => {
  const renderer = render();
  const root = renderer.toJSON();

  expect(root.children.length).toEqual(1);
  expect(root.children[0]).toEqual('Cell is inactive');
  expect(root.props.className).toEqual(undefined);
  expect(root.props.role).toEqual('cell');
  expect(root.props.tabIndex).toEqual(-1);
});

test('has a className property', () => {
  const renderer = render({ className: 'part-of-the-api' });
  const root = renderer.toJSON();

  expect(root.props.className).toEqual('part-of-the-api');
});

describe('active property', () => {
  test('enables interactivity', () => {
    const renderer = render({ active: true });
    const root = renderer.toJSON();

    expect(root.props.tabIndex).toEqual(0);
  });

  test('disables interactivity', () => {
    const renderer = render({ active: false });
    const root = renderer.toJSON();

    expect(root.props.tabIndex).toEqual(-1);
  });

  test('passes the property to its children', () => {
    const activeRenderer = render({ active: true });
    const activeRoot = activeRenderer.toJSON();
    expect(activeRoot.children[0]).toEqual('Cell is active');

    const inactiveRenderer = render({ active: false });
    const inactiveRoot = inactiveRenderer.toJSON();
    expect(inactiveRoot.children[0]).toEqual('Cell is inactive');
  });
});

describe('focus behavior', () => {
  test('focuses the cell ref', () => {
    const renderer = render({ active: true });
    const instance = renderer.getInstance();

    expect(instance.props.cellRef.current.focus.mock.calls.length).toEqual(1);
  });

  test('does not focus the cell ref', () => {
    const renderer = render({ active: false });
    const instance = renderer.getInstance();

    expect(instance.props.cellRef.current.focus.mock.calls.length).toEqual(0);
  });
});

describe('header property', () => {
  test('dictates rowheader role', () => {
    const renderer = render({ header: true });
    const root = renderer.toJSON();

    expect(root.props.role).toEqual('rowheader');
  });

  test('dictates cell role', () => {
    const renderer = render({ header: false });
    const root = renderer.toJSON();

    expect(root.props.role).toEqual('cell');
  });
});
