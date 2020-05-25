import React from 'react';
import renderer from 'react-test-renderer';
import AccordionHeader from './accordion-header.js';

describe('<AccordionHeader />', () => {
  it('has default props', () => {
    expect(renderer.create(<AccordionHeader />).toJSON())
      .toMatchInlineSnapshot(`
      <button
        type="button"
      />
    `);
  });
});
