import React from 'react';
import TestRenderer from 'react-test-renderer';

import Cursor from './index.js';

test('is a component', () => {
  const renderer = TestRenderer.create(
      <Cursor>
        {() => (
          'Hello world!'
        )}
      </Cursor>
  );

  expect(renderer.toJSON().children.length).toEqual(1);
  expect(renderer.toJSON().children[0]).toEqual('Hello world!');
});
