import React from 'react';
import TestRenderer from 'react-test-renderer';

import Cursor from './index.js';

function render(props) {
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

  return TestRenderer.create((
    <Cursor refs={refs} {...props}>
      {(positionX, positionY) => (
        `Current position: ${positionX}, ${positionY}`
      )}
    </Cursor>
  ));
}

test('receives keyboard events', () => {
  const renderer = render();
  const root = renderer.toJSON();

  expect(root.props.tabIndex).toStrictEqual(0);
});

test('renders the default state', () => {
  const renderer = render();
  const root = renderer.toJSON();

  expect(root.children.length).toStrictEqual(1);
  expect(root.children[0]).toStrictEqual('Current position: -1, -1');
  expect(root.props.className).toStrictEqual(undefined);
  expect(root.props.role).toStrictEqual('presentation');
});

test('has a className property', () => {
  const renderer = render({ className: 'part-of-the-api' });
  const root = renderer.toJSON();

  expect(root.props.className).toStrictEqual('part-of-the-api');
});

test('has a role property', () => {
  const renderer = render({ role: 'part-of-the-api' });
  const root = renderer.toJSON();

  expect(root.props.role).toStrictEqual('part-of-the-api');
});

describe('x-axis position', () => {
  it('increments', () => {
    const renderer = render();
    const keyEvent = {
      key: 'ArrowRight',
      preventDefault: jest.fn(),
    };

    renderer.toTree().rendered.props.onKeyDown(keyEvent);
    expect(renderer.toTree().rendered.rendered[0]).toStrictEqual('Current position: 0, 0');
    expect(keyEvent.preventDefault.mock.calls.length).toStrictEqual(1);
  });

  it('decrements', () => {
    const renderer = render();
    const clickEvent = {
      target: [1, 0],
    };
    const keyEvent = {
      key: 'ArrowLeft',
      preventDefault: jest.fn(),
    };

    renderer.toTree().rendered.props.onClick(clickEvent);
    renderer.toTree().rendered.props.onKeyDown(keyEvent);
    expect(renderer.toTree().rendered.rendered[0]).toStrictEqual('Current position: 0, 0');
    expect(keyEvent.preventDefault.mock.calls.length).toStrictEqual(1);
  });

  it('has a lower-bound', () => {
    const renderer = render();
    const clickEvent = {
      target: [0, 0],
    };
    const keyEvent = {
      key: 'ArrowLeft',
      preventDefault: jest.fn(),
    };

    renderer.toTree().rendered.props.onClick(clickEvent);
    renderer.toTree().rendered.props.onKeyDown(keyEvent);
    expect(renderer.toTree().rendered.rendered[0]).toStrictEqual('Current position: 0, 0');
    expect(keyEvent.preventDefault.mock.calls.length).toStrictEqual(1);
  });

  it('has an upper-bound', () => {
    const renderer = render();
    const clickEvent = {
      target: [1, 0],
    };
    const keyEvent = {
      key: 'ArrowRight',
      preventDefault: jest.fn(),
    };

    renderer.toTree().rendered.props.onClick(clickEvent);
    renderer.toTree().rendered.props.onKeyDown(keyEvent);
    expect(renderer.toTree().rendered.rendered[0]).toStrictEqual('Current position: 1, 0');
    expect(keyEvent.preventDefault.mock.calls.length).toStrictEqual(1);
  });
});

describe('y-axis position', () => {
  it('increments its position on the y-axis', () => {
    const renderer = render();
    const keyEvent = {
      key: 'ArrowDown',
      preventDefault: jest.fn(),
    };

    renderer.toTree().rendered.props.onKeyDown(keyEvent);
    expect(renderer.toTree().rendered.rendered[0]).toStrictEqual('Current position: 0, 0');
    expect(keyEvent.preventDefault.mock.calls.length).toStrictEqual(1);
  });

  it('decrements its position on the y-axis', () => {
    const renderer = render();
    const clickEvent = {
      target: [0, 1],
    };
    const keyEvent = {
      key: 'ArrowUp',
      preventDefault: jest.fn(),
    };

    renderer.toTree().rendered.props.onClick(clickEvent);
    renderer.toTree().rendered.props.onKeyDown(keyEvent);
    expect(renderer.toTree().rendered.rendered[0]).toStrictEqual('Current position: 0, 0');
    expect(keyEvent.preventDefault.mock.calls.length).toStrictEqual(1);
  });

  it('has a lower-bound', () => {
    const renderer = render();
    const clickEvent = {
      target: [0, 0],
    };
    const keyEvent = {
      key: 'ArrowUp',
      preventDefault: jest.fn(),
    };

    renderer.toTree().rendered.props.onClick(clickEvent);
    renderer.toTree().rendered.props.onKeyDown(keyEvent);
    expect(renderer.toTree().rendered.rendered[0]).toStrictEqual('Current position: 0, 0');
    expect(keyEvent.preventDefault.mock.calls.length).toStrictEqual(1);
  });

  it('has an upper-bound', () => {
    const renderer = render();
    const clickEvent = {
      target: [0, 1],
    };
    const keyEvent = {
      key: 'ArrowDown',
      preventDefault: jest.fn(),
    };

    renderer.toTree().rendered.props.onClick(clickEvent);
    renderer.toTree().rendered.props.onKeyDown(keyEvent);
    expect(renderer.toTree().rendered.rendered[0]).toStrictEqual('Current position: 0, 1');
    expect(keyEvent.preventDefault.mock.calls.length).toStrictEqual(1);
  });
});

test('does not prevent default behavior on non-navigation keys', () => {
  const renderer = render();
  const event = {
    key: 'Space',
    preventDefault: jest.fn(),
  };

  renderer.toTree().rendered.props.onKeyDown(event);
  expect(event.preventDefault.mock.calls.length).toStrictEqual(0);
});

test('finds indices and updates its position', () => {
  const renderer = render();
  const event = {
    target: [1, 1],
  };

  renderer.toTree().rendered.props.onClick(event);
  expect(renderer.toTree().rendered.rendered[0]).toStrictEqual('Current position: 1, 1');
});

test('shortcuts to the start of the row', () => {
  const renderer = render();
  const clickEvent = {
    target: [1, 0],
  };
  const keyEvent = {
    key: 'Home',
    preventDefault: jest.fn(),
  };

  renderer.toTree().rendered.props.onClick(clickEvent);
  renderer.toTree().rendered.props.onKeyDown(keyEvent);
  expect(renderer.toTree().rendered.rendered[0]).toStrictEqual('Current position: 0, 0');
  expect(keyEvent.preventDefault.mock.calls.length).toStrictEqual(1);
});

test('shortcuts to the end of the row', () => {
  const renderer = render();
  const clickEvent = {
    target: [0, 0],
  };
  const keyEvent = {
    key: 'End',
    preventDefault: jest.fn(),
  };

  renderer.toTree().rendered.props.onClick(clickEvent);
  renderer.toTree().rendered.props.onKeyDown(keyEvent);
  expect(renderer.toTree().rendered.rendered[0]).toStrictEqual('Current position: 1, 0');
  expect(keyEvent.preventDefault.mock.calls.length).toStrictEqual(1);
});

test('shortcuts to the first row', () => {
  const renderer = render();
  const clickEvent = {
    target: [0, 1],
  };
  const keyEvent = {
    key: 'PageUp',
    preventDefault: jest.fn(),
  };

  renderer.toTree().rendered.props.onClick(clickEvent);
  renderer.toTree().rendered.props.onKeyDown(keyEvent);
  expect(renderer.toTree().rendered.rendered[0]).toStrictEqual('Current position: 0, 0');
  expect(keyEvent.preventDefault.mock.calls.length).toStrictEqual(1);
});

test('shortcuts to the last row', () => {
  const renderer = render();
  const clickEvent = {
    target: [0, 0],
  };
  const keyEvent = {
    key: 'PageDown',
    preventDefault: jest.fn(),
  };

  renderer.toTree().rendered.props.onClick(clickEvent);
  renderer.toTree().rendered.props.onKeyDown(keyEvent);
  expect(renderer.toTree().rendered.rendered[0]).toStrictEqual('Current position: 0, 1');
  expect(keyEvent.preventDefault.mock.calls.length).toStrictEqual(1);
});
