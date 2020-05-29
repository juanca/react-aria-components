import React from 'react';
import renderer from 'react-test-renderer';
import AccordionHeader from './accordion-header.js';

describe('<AccordionHeader />', () => {
  it('has default props', () => {
    expect(renderer.create(<AccordionHeader htmlFor="foo" onClick={() => {}} />).toJSON()).toMatchInlineSnapshot(`
      <button
        htmlFor="foo"
        onClick={[Function]}
        type="button"
      />
    `);
  });
});
