import React, {
  createRef,
} from 'react';
import renderer from 'react-test-renderer';
import {
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import ListOption from './list-option.js';

describe('<Listbox />', () => {
  const requiredProps = {
  };

  it('has defaults', () => {
    expect(renderer.create(<ListOption {...requiredProps} />).toJSON()).toMatchSnapshot();
  });

  describe('accessibility', () => {});

  describe('blur ref API', () => {
    it('manages its page tab sequence', () => {
      const ref = createRef();
      render((
        <ListOption {...requiredProps} ref={ref} />
      ));

      ref.current.blur();
      waitFor(() => expect(screen.getByText('Unique option')).toHaveAttribue('tabindex', '-1'));
    });
  });

  describe('children prop API', () => {
    it('can be set', () => {
      render((
        <ListOption {...requiredProps}>
          Unique option
        </ListOption>
      ));

      expect(screen.getByText('Unique option')).toBeInTheDocument();
    });
  });

  describe('contains ref API', () => {
    it('matches on a node', () => {
      const ref = createRef();
      render((
        <ListOption {...requiredProps} ref={ref}>
          Unique option
        </ListOption>
      ));

      expect(ref.current.contains(screen.getByText('Unique option'))).toBe(true);
    });

    it('matches on a nested node', () => {
      const ref = createRef();
      render((
        <ListOption {...requiredProps} ref={ref}>
          <div>Unique option</div>
        </ListOption>
      ));

      expect(ref.current.contains(screen.getByText('Unique option'))).toBe(true);
    });
  });

  describe('focus ref API', () => {
    it('manages its page tab sequence', () => {
      const ref = createRef();
      render((
        <ListOption {...requiredProps} ref={ref} />
      ));

      ref.current.focus();
      waitFor(() => expect(screen.getByText('Unique option')).toHaveAttribue('tabindex', '0'));
    });

    it('focuses itself', () => {
      const ref = createRef();
      render((
        <ListOption {...requiredProps} ref={ref} />
      ));

      ref.current.focus();
      waitFor(() => expect(screen.getByText('Unique option')).toHaveFocus());
    });
  });
});
