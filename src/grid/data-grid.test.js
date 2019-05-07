import React from 'react';
import TestRenderer from 'react-test-renderer';

import DataGrid from './data-grid.js';

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
