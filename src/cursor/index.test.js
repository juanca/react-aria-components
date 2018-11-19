import React from 'react';
import TestRenderer from 'react-test-renderer';

import Cursor from './index.js';

function render() {
  return TestRenderer.create(
    <Cursor>
      {(position) => (
        `Current position: ${position}`
      )}
    </Cursor>
  );
}

test('renders the default state', () => {
  const renderer = render();
  const root = renderer.toJSON();

  expect(root.children.length).toEqual(1);
  expect(root.children[0]).toEqual('Current position: -1');
});
