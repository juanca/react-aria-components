import React from 'react';
import renderer from 'react-test-renderer';
import { act, render, screen } from '@testing-library/react';
import AccordionPanel from './accordion-panel.js';

describe('<AccordionPanel />', () => {
  it('has default props', () => {
    /* eslint-disable */
    expect(renderer.create(<AccordionPanel id="foo"/>).toJSON()).toMatchInlineSnapshot(
      `<div />`
    );
    /* eslint-enable */
  });

  describe('ref API', () => {
    it('can close', async () => {
      const ref = React.createRef();
      render(<AccordionPanel id="foo" ref={ref}>Test</AccordionPanel>);
      act(() => ref.current.close());
      expect(screen.queryByText('Test')).toBeNull();
    });

    it('can open', () => {
      const ref = React.createRef();
      render(<AccordionPanel id="foo" ref={ref}>Test</AccordionPanel>);
      act(() => ref.current.open());
      expect(screen.getByText('Test')).toBeDefined();
    });
  });
});
