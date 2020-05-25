import React from 'react';
import renderer from 'react-test-renderer';
import Panel from './panel.js';

describe('accordion <Panel />', () => {
  it('has default props', () => {
    expect(renderer.create(<Panel />).toJSON()).toMatchInlineSnapshot(`
      <div>
        Accordion Panel
      </div>
    `);
  });
});
