import React from 'react';
import TestRenderer from 'react-test-renderer';

import Cursor from './index.js';

function render() {
  return TestRenderer.create(
    <Cursor>
      {(positionX, positionY) => (
        `Current position: ${positionX}, ${positionY}`
      )}
    </Cursor>
  );
}

test('is receives keyboard events', () => {
  const renderer = render();
  const root = renderer.toJSON();

  expect(root.props.tabIndex).toEqual(0);
});

test('renders the default state', () => {
  const renderer = render();
  const root = renderer.toJSON();

  expect(root.children.length).toEqual(1);
  expect(root.children[0]).toEqual('Current position: -1, -1');
});

test('increments its position on the x-axis', () => {
  const renderer = render();

  renderer.toTree().rendered.props.onKeyDown({ key: 'ArrowRight', preventDefault: jest.fn() });
  expect(renderer.toTree().rendered.rendered[0]).toEqual('Current position: 0, 0');

  renderer.toTree().rendered.props.onKeyDown({ key: 'ArrowRight', preventDefault: jest.fn() });
  expect(renderer.toTree().rendered.rendered[0]).toEqual('Current position: 1, 0');
});

test('decrements its position on the x-axis', () => {
  const renderer = render();

  renderer.toTree().rendered.props.onKeyDown({ key: 'ArrowLeft', preventDefault: jest.fn() });
  expect(renderer.toTree().rendered.rendered[0]).toEqual('Current position: -2, 0');

  renderer.toTree().rendered.props.onKeyDown({ key: 'ArrowLeft', preventDefault: jest.fn() });
  expect(renderer.toTree().rendered.rendered[0]).toEqual('Current position: -3, 0');
});

test('increments its position on the y-axis', () => {
  const renderer = render();

  renderer.toTree().rendered.props.onKeyDown({ key: 'ArrowDown', preventDefault: jest.fn() });
  expect(renderer.toTree().rendered.rendered[0]).toEqual('Current position: 0, 0');

  renderer.toTree().rendered.props.onKeyDown({ key: 'ArrowDown', preventDefault: jest.fn() });
  expect(renderer.toTree().rendered.rendered[0]).toEqual('Current position: 0, 1');
});

test('decrements its position on the y-axis', () => {
  const renderer = render();

  renderer.toTree().rendered.props.onKeyDown({ key: 'ArrowUp', preventDefault: jest.fn() });
  expect(renderer.toTree().rendered.rendered[0]).toEqual('Current position: 0, -2');

  renderer.toTree().rendered.props.onKeyDown({ key: 'ArrowUp', preventDefault: jest.fn()});
  expect(renderer.toTree().rendered.rendered[0]).toEqual('Current position: 0, -3');
});
