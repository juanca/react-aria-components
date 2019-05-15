import React from 'react';
import TestRenderer from 'react-test-renderer';

import DataGrid from './data-grid.js';
import GridCell from './grid-cell.js';
import GridRow from './grid-row.js';

function render(props) {
  const refs = [];

  return TestRenderer.create((
    <DataGrid refs={refs} {...props}>
      <div>I am the first row</div>
      <div>I am the second row</div>
    </DataGrid>
  ));
}

test('is a Cursor', () => {
  expect(render().toTree().rendered.instance.constructor.name).toStrictEqual('Cursor');
});

test('renders the default state', () => {
  const renderer = render();
  const root = renderer.toJSON();

  expect(root.children.length).toStrictEqual(2);
  expect(root.props.className).toStrictEqual(undefined);
  expect(root.props.role).toStrictEqual('grid');
});

test('has a className property', () => {
  const renderer = render({ className: 'part-of-the-api' });
  const root = renderer.toJSON();

  expect(root.props.className).toStrictEqual('part-of-the-api');
});

describe('end-to-end grid components', () => {
  it('does not have prop-type validation errors', () => {
    jest.spyOn(console, 'error').mockImplementation(() => undefined);

    TestRenderer.create((
      <DataGrid refs={[[{}, {}], [{}, {}]]}>
        <GridRow>
          <GridCell cellRef={React.createRef()}>{() => 'I am the'}</GridCell>
          <GridCell cellRef={React.createRef()}>{() => 'first row'}</GridCell>
        </GridRow>
        <GridRow>
          <GridCell cellRef={React.createRef()}>{() => 'I am the'}</GridCell>
          <GridCell cellRef={React.createRef()}>{() => 'second row'}</GridCell>
        </GridRow>
      </DataGrid>
    ));

    expect(console.error).not.toHaveBeenCalled(); // eslint-disable-line no-console
  });
});
