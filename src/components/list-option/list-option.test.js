import React, {
  createRef,
} from 'react';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Context } from '../listbox/listbox.js';
import ListOption from './list-option.js';

describe('<ListOption />', () => {
  const requiredProps = {
    children: 'Test option',
    value: 'test-value',
  };

  it('has defaults', () => {
    render(<ListOption {...requiredProps} />);
    expect(document.body).toMatchSnapshot();
  });

  describe('accessibility', () => {
    it('selects on click', async () => {
      render(<ListOption {...requiredProps} selected={false} />);

      userEvent.click(screen.getByText('Test option'));
      await waitFor(() => expect(screen.getByText('Test option')).toHaveAttribute('aria-selected', 'true'));
    });

    it('deselects on click', async () => {
      render(<ListOption {...requiredProps} selected />);

      userEvent.click(screen.getByText('Test option'));
      await waitFor(() => expect(screen.getByText('Test option')).toHaveAttribute('aria-selected', 'false'));
    });

    it('selects on enter key', async () => {
      render(<ListOption {...requiredProps} />);

      expect(screen.getByText('Test option')).toHaveAttribute('aria-selected', 'false');
      fireEvent.keyDown(screen.getByText('Test option'), { key: 'Enter' });
      await waitFor(() => expect(screen.getByText('Test option')).toHaveAttribute('aria-selected', 'true'));
    });

    it('deselects on enter key', async () => {
      render(<ListOption {...requiredProps} selected />);

      fireEvent.keyDown(screen.getByText('Test option'), { key: 'Enter' });
      await waitFor(() => expect(screen.getByText('Test option')).toHaveAttribute('aria-selected', 'false'));
    });
  });

  describe('context API', () => {
    describe('onChange', () => {
      it('is called when selected state changes', () => {
        const ref = createRef();
        const onChange = jest.fn();

        render((
          <Context.Provider value={{ onChange }}>
            <ListOption {
              ...requiredProps} ref={ref} />
          </Context.Provider>
        ));
        expect(onChange).not.toHaveBeenCalled();

        userEvent.click(screen.getByText('Test option'));
        expect(onChange).toHaveBeenCalledWith({ target: ref.current });
      });
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

  describe('className prop API', () => {
    it('can be set', () => {
      render(<ListOption {...requiredProps} className="unique-class" />);

      expect(screen.getByText('Test option')).toHaveClass('unique-class');
    });
  });

  describe('contains ref API', () => {
    it('matches on a node', () => {
      const ref = createRef();
      render(<ListOption {...requiredProps} ref={ref} />);

      expect(ref.current.contains(screen.getByText('Test option'))).toBe(true);
    });

    it('matches on a nested node', () => {
      const ref = createRef();
      render((
        <ListOption {...requiredProps} ref={ref}>
          <div>Nested option</div>
        </ListOption>
      ));

      expect(ref.current.contains(screen.getByText('Nested option'))).toBe(true);
    });
  });

  describe('focus ref API', () => {
    it('focuses itself', async () => {
      const ref = createRef();
      render(<ListOption {...requiredProps} ref={ref} />);

      act(() => ref.current.focus());
      await waitFor(() => expect(screen.getByText('Test option')).toHaveFocus());
    });
  });

  describe('selected prop API', () => {
    it('can be set', () => {
      render(<ListOption {...requiredProps} selected />);

      expect(screen.getByText('Test option')).toHaveAttribute('aria-selected', 'true');
    });

    it('can be unset', () => {
      render(<ListOption {...requiredProps} selected={false} />);

      expect(screen.getByText('Test option')).toHaveAttribute('aria-selected', 'false');
    });
  });

  describe('selected ref API', () => {
    it('exposes selected state', () => {
      const ref = createRef();
      render(<ListOption {...requiredProps} ref={ref} />);

      act(() => ref.current.setAttribute('selected', true));
      expect(ref.current.selected).toBe(true);

      act(() => ref.current.setAttribute('selected', false));
      expect(ref.current.selected).toBe(false);
    });
  });

  describe('setAttribute ref API', () => {
    it('can set selected', async () => {
      const ref = createRef();
      render(<ListOption {...requiredProps} ref={ref} />);

      act(() => ref.current.setAttribute('selected', true));
      await waitFor(() => expect(screen.getByText('Test option')).toHaveAttribute('aria-selected', 'true'));

      act(() => ref.current.setAttribute('selected', false));
      await waitFor(() => expect(screen.getByText('Test option')).toHaveAttribute('aria-selected', 'false'));
    });

    it('can set tabindex', async () => {
      const ref = createRef();
      render(<ListOption {...requiredProps} ref={ref} />);

      act(() => ref.current.setAttribute('tabindex', 0));
      await waitFor(() => expect(screen.getByText('Test option')).toHaveAttribute('tabindex', '0'));

      act(() => ref.current.setAttribute('tabindex', -1));
      await waitFor(() => expect(screen.getByText('Test option')).toHaveAttribute('tabindex', '-1'));
    });
  });

  describe('value ref API', () => {
    it('exposes value prop', () => {
      const ref = createRef();
      render(<ListOption {...requiredProps} ref={ref} value="unique-value" />);

      expect(ref.current.value).toBe('unique-value');
    });
  });
});
