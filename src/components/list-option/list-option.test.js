import React, {
  createRef,
} from 'react';
import {
  act,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Handler,
  Mode,
} from '../listbox/listbox.js';
import ListOption from './list-option.js';

describe('<ListOption />', () => {
  const requiredProps = {
    value: 'test-value',
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<ListOption {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(document.body).toHaveFocus();
    expect(ref.current).toMatchSnapshot();
  });

  describe('context API', () => {
    describe('Handler', () => {
      it('is called when selected state changes', () => {
        const ref = createRef();
        const onChange = jest.fn();

        render((
          <Handler.Provider value={onChange}>
            <ListOption {...requiredProps} ref={ref} />
          </Handler.Provider>
        ));

        expect(onChange).not.toHaveBeenCalled();
        userEvent.click(screen.getByRole('option'));
        expect(onChange).toHaveBeenCalledWith({ target: ref.current });
      });
    });

    describe('Mode', () => {
      it('is set to single select mode', () => {
        render((
          <Mode.Provider value="single">
            <ListOption {...requiredProps} />
          </Mode.Provider>
        ));

        expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'false');
        userEvent.click(screen.getByRole('option'));
        expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'true');
        userEvent.click(screen.getByRole('option'));
        expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'true');
      });
    });
  });

  describe('children API', () => {
    it('can be set', () => {
      render((
        <ListOption {...requiredProps}>
          Unique option
        </ListOption>
      ));

      expect(screen.getByText('Unique option')).toBeInTheDocument();
    });

    it('can be blank', () => {
      render((
        <ListOption {...requiredProps} />
      ));

      expect(screen.getByRole('option')).toBeInTheDocument();
    });
  });

  describe('className API', () => {
    it('can be set', () => {
      render(<ListOption {...requiredProps} className="unique-class" />);
      expect(screen.getByRole('option')).toHaveClass('unique-class');
    });
  });

  describe('contains API', () => {
    it('matches on a node', () => {
      const ref = createRef();
      render(<ListOption {...requiredProps} ref={ref} />);
      expect(ref.current.contains(screen.getByRole('option'))).toBe(true);
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

  describe('focus API', () => {
    it('focuses itself', async () => {
      const ref = createRef();
      render(<ListOption {...requiredProps} ref={ref} />);
      expect(screen.getByRole('option')).not.toHaveFocus();

      act(() => ref.current.focus());
      expect(screen.getByRole('option')).toHaveFocus();
    });
  });

  describe('onChange API', () => {
    it('is called when selected state changes', () => {
      const ref = createRef();
      const onChange = jest.fn();
      render(<ListOption {...requiredProps} onChange={onChange} ref={ref} />);
      expect(onChange).not.toHaveBeenCalled();
      userEvent.click(screen.getByRole('option'));
      expect(onChange).toHaveBeenCalledWith({ target: ref.current });
    });
  });

  describe('selected API', () => {
    it('is a boolean', () => {
      const ref = createRef();
      const { rerender } = render(<ListOption {...requiredProps} ref={ref} selected={true} />);
      expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'true');
      expect(ref.current.selected).toBe(true);

      rerender(<ListOption {...requiredProps} ref={ref} selected={false} />);
      expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'false');
      expect(ref.current.selected).toBe(false);
    });

    it('is a setter', () => {
      const ref = createRef();
      render(<ListOption {...requiredProps} ref={ref} />);
      expect(ref.current.selected).toBe(false);

      act(() => ref.current.setAttribute('selected', true));
      expect(ref.current.selected).toBe(true);
      expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'true');

      act(() => ref.current.setAttribute('selected', false));
      expect(ref.current.selected).toBe(false);
      expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'false');
    });

    it('invokes the onChange callback', () => {
      const ref = createRef();
      const spy = jest.fn();
      render(<ListOption {...requiredProps} onChange={spy} ref={ref} selected={true} />);
      expect(spy).not.toHaveBeenCalled();
      act(() => ref.current.setAttribute('selected', false));
      expect(spy).toHaveBeenCalledWith({ target: ref.current });
    });
  });

  describe('setAttribute API', () => {
    it('can set selected', async () => {
      const ref = createRef();
      render(<ListOption {...requiredProps} ref={ref} />);
      expect(ref.current.selected).toEqual(false);
      expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'false');

      act(() => ref.current.setAttribute('selected', true));
      expect(ref.current.selected).toEqual(true);
      expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'true');

      act(() => ref.current.setAttribute('selected', false));
      expect(ref.current.selected).toEqual(false);
      expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'false');
    });

    it('can set tabindex', async () => {
      const ref = createRef();
      render(<ListOption {...requiredProps} ref={ref} />);

      act(() => ref.current.setAttribute('tabindex', -1));
      expect(screen.getByRole('option')).toHaveAttribute('tabindex', '-1');

      act(() => ref.current.setAttribute('tabindex', 0));
      expect(screen.getByRole('option')).toHaveAttribute('tabindex', '0');
    });
  });

  describe('value API', () => {
    it('exposes value prop', () => {
      const ref = createRef();
      render(<ListOption {...requiredProps} ref={ref} value="unique-value" />);
      expect(ref.current.value).toBe('unique-value');
    });
  });

  describe('selecting behavior', () => {
    it('uses clicks', () => {
      render((
        <Mode.Provider value="multiple">
          <ListOption {...requiredProps} />
        </Mode.Provider>
      ));
      expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'false');
      userEvent.click(screen.getByRole('option'));
      expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'true');
      userEvent.click(screen.getByRole('option'));
      expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'false');
    });

    it('uses the space key', () => {
      const ref = createRef();
      render((
        <Mode.Provider value="multiple">
          <ListOption {...requiredProps} ref={ref} />
        </Mode.Provider>
      ));
      act(() => ref.current.focus());
      expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'false');
      userEvent.keyboard(' ');
      expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'true');
      userEvent.keyboard(' ');
      expect(screen.getByRole('option')).toHaveAttribute('aria-selected', 'false');
    });
  });
});
