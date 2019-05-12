import React from 'react';
import TestRenderer from 'react-test-renderer';

import GridCell from './grid-cell.js';

function render(props) {
  const cellRef = React.createRef();

  return TestRenderer.create((
    <GridCell cellRef={cellRef} {...props}>
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

  expect(root.children.length).toStrictEqual(1);
  expect(root.children[0]).toStrictEqual('Cell is inactive');
  expect(root.props.className).toStrictEqual(undefined);
  expect(root.props.role).toStrictEqual('cell');
  expect(root.props.tabIndex).toStrictEqual(-1);
});

test('has a className property', () => {
  const renderer = render({ className: 'part-of-the-api' });
  const root = renderer.toJSON();

  expect(root.props.className).toStrictEqual('part-of-the-api');
});

describe('active property', () => {
  it('enables interactivity', () => {
    const renderer = render({ active: true });
    const root = renderer.toJSON();

    expect(root.props.tabIndex).toStrictEqual(0);
  });

  it('disables interactivity', () => {
    const renderer = render({ active: false });
    const root = renderer.toJSON();

    expect(root.props.tabIndex).toStrictEqual(-1);
  });

  it('passes the property to its children', () => {
    const activeRenderer = render({ active: true });
    const activeRoot = activeRenderer.toJSON();
    expect(activeRoot.children[0]).toStrictEqual('Cell is active');

    const inactiveRenderer = render({ active: false });
    const inactiveRoot = inactiveRenderer.toJSON();
    expect(inactiveRoot.children[0]).toStrictEqual('Cell is inactive');
  });
});

describe('focus behavior', () => {
  it('focuses the cell ref', () => {
    const renderer = render({ active: true });
    const instance = renderer.getInstance();

    expect(instance.props.cellRef.current.focus.mock.calls.length).toStrictEqual(1);
  });

  it('does not focus the cell ref', () => {
    const renderer = render({ active: false });
    const instance = renderer.getInstance();

    expect(instance.props.cellRef.current.focus.mock.calls.length).toStrictEqual(0);
  });
});

describe('header property', () => {
  it('dictates rowheader role', () => {
    const renderer = render({ header: true });
    const root = renderer.toJSON();

    expect(root.props.role).toStrictEqual('rowheader');
  });

  it('dictates cell role', () => {
    const renderer = render({ header: false });
    const root = renderer.toJSON();

    expect(root.props.role).toStrictEqual('cell');
  });
});
