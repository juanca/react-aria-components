import React from 'react';
import renderer from 'react-test-renderer';
import AccordionPanel from './accordion-panel.js';

describe('<AccordionPanel />', () => {
  it('has default props', () => {
    expect(renderer.create(<AccordionPanel />).toJSON()).toMatchInlineSnapshot(
      `<div />`
    );
  });
});
