import React from 'react';
import TestRenderer from 'react-test-renderer';

import Cursor from './index.js';

test('renders the default state', () => {
  const renderer = TestRenderer.create(
      <Cursor>
        {(position) => (
          `Current position: ${position}`
        )}
      </Cursor>
  );

  expect(renderer.toJSON().children.length).toEqual(1);
  expect(renderer.toJSON().children[0]).toEqual('Current position: -1');
});
