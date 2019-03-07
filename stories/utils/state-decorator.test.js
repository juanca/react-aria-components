import React from 'react';
import TestRenderer from 'react-test-renderer';
import StateDecorator from './state-decorator';

function getTestCase() {
  return TestRenderer.create(
    <StateDecorator
      initialState={{ num: 0 }}
      storyFn={({ setState, state }) => (
        <button onClick={() => setState({ num: state.num + 1 })} type="button">
          {state.num}
        </button>
      )}
    />,
  );
}

test('initial state', () => {
  const renderer = getTestCase();
  const button = renderer.root.findByType('button');
  expect(button.props.children).toEqual(0);
});

test('updating state', () => {
  const renderer = getTestCase();
  const button = renderer.root.findByType('button');
  button.props.onClick();
  expect(button.props.children).toEqual(1);
});
