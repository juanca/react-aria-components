import React from 'react';
import TestRenderer from 'react-test-renderer';

import Cursor from './index.js';

function render() {
  const refs = [
    [
      { current: { contains: ([x, y]) => x === 0 && y === 0 } },
      { current: { contains: ([x, y]) => x === 1 && y === 0 } },
    ],
    [
      { current: { contains: ([x, y]) => x === 0 && y === 1 } },
      { current: { contains: ([x, y]) => x === 1 && y === 1 } },
    ],
  ];

  return TestRenderer.create(
    <Cursor refs={refs}>
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

describe('x-axis position', () => {
  test('increments', () => {
    const renderer = render();
    const event = {
      key: 'ArrowRight',
      preventDefault: jest.fn(),
    };

    renderer.toTree().rendered.props.onKeyDown(event);
    expect(renderer.toTree().rendered.rendered[0]).toEqual('Current position: 0, 0');

    renderer.toTree().rendered.props.onKeyDown(event);
    expect(renderer.toTree().rendered.rendered[0]).toEqual('Current position: 1, 0');

    expect(event.preventDefault.mock.calls.length).toEqual(2);
  });

  test('decrements', () => {
    const renderer = render();
    const event = {
      key: 'ArrowLeft',
      preventDefault: jest.fn(),
    };

    renderer.toTree().rendered.props.onKeyDown(event);
    expect(renderer.toTree().rendered.rendered[0]).toEqual('Current position: -2, 0');

    renderer.toTree().rendered.props.onKeyDown(event);
    expect(renderer.toTree().rendered.rendered[0]).toEqual('Current position: -3, 0');

    expect(event.preventDefault.mock.calls.length).toEqual(2);
  });
});

describe('y-axis position', () => {
  test('increments its position on the y-axis', () => {
    const renderer = render();
    const event = {
      key: 'ArrowDown',
      preventDefault: jest.fn(),
    };

    renderer.toTree().rendered.props.onKeyDown(event);
    expect(renderer.toTree().rendered.rendered[0]).toEqual('Current position: 0, 0');

    renderer.toTree().rendered.props.onKeyDown(event);
    expect(renderer.toTree().rendered.rendered[0]).toEqual('Current position: 0, 1');

    expect(event.preventDefault.mock.calls.length).toEqual(2);
  });

  test('decrements its position on the y-axis', () => {
    const renderer = render();
    const event = {
      key: 'ArrowUp',
      preventDefault: jest.fn(),
    };

    renderer.toTree().rendered.props.onKeyDown(event);
    expect(renderer.toTree().rendered.rendered[0]).toEqual('Current position: 0, -2');

    renderer.toTree().rendered.props.onKeyDown(event);
    expect(renderer.toTree().rendered.rendered[0]).toEqual('Current position: 0, -3');

    expect(event.preventDefault.mock.calls.length).toEqual(2);
  });
});

test('does not prevent default behavior on non-navigation keys', () => {
  const renderer = render();
  const event = {
    key: 'Space',
    preventDefault: jest.fn(),
  };

  renderer.toTree().rendered.props.onKeyDown(event);
  expect(event.preventDefault.mock.calls.length).toEqual(0);
});

test('finds indices and updates its position', () => {
  const renderer = render();
  const event = {
    target: [1, 1]
  };

  renderer.toTree().rendered.props.onClick(event);
  expect(renderer.toTree().rendered.rendered[0]).toEqual('Current position: 1, 1');
});
