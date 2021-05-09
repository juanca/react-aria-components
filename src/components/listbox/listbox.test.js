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
import Listbox, { Context } from './listbox.js';

describe('<Listbox />', () => {
  const requiredProps = {
    labelledBy: 'test-label-id',
  };

  it('has defaults', () => {
    render(<Listbox {...requiredProps} />);
    expect(document.body).toMatchSnapshot();
  });

  describe('accessibility', () => {
    it('does not steal focus on mount', () => {
      const refs = [createRef(), createRef(), createRef()];
      render((
        <Listbox {...requiredProps} refs={refs}>
          <li ref={refs[0]} tabIndex="-1">First</li>
          <li ref={refs[1]} tabIndex="-1">Second</li>
          <li ref={refs[2]} tabIndex="-1">Third</li>
        </Listbox>
      ));

      expect(document.body).toHaveFocus();
    });

    it('focuses the list item with a click', async () => {
      const refs = [createRef(), createRef(), createRef()];
      render((
        <Listbox {...requiredProps} refs={refs}>
          <li ref={refs[0]} tabIndex="-1">First</li>
          <li ref={refs[1]} tabIndex="-1">Second</li>
          <li ref={refs[2]} tabIndex="-1">Third</li>
        </Listbox>
      ));

      userEvent.click(screen.getByText('Second'));
      await waitFor(() => expect(screen.getByText('Second')).toHaveFocus());
    });

    it('focuses the next list item with arrow down key', async () => {
      const refs = [createRef(), createRef(), createRef()];
      render((
        <Listbox {...requiredProps} refs={refs}>
          <li ref={refs[0]} tabIndex="-1">First</li>
          <li ref={refs[1]} tabIndex="-1">Second</li>
          <li ref={refs[2]} tabIndex="-1">Third</li>
        </Listbox>
      ));

      userEvent.click(screen.getByText('Second'));
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      await waitFor(() => expect(screen.getByText('Third')).toHaveFocus());
    });

    it('focuses the previous list item with arrow up key', async () => {
      const refs = [createRef(), createRef(), createRef()];
      render((
        <Listbox {...requiredProps} refs={refs}>
          <li ref={refs[0]} tabIndex="-1">First</li>
          <li ref={refs[1]} tabIndex="-1">Second</li>
          <li ref={refs[2]} tabIndex="-1">Third</li>
        </Listbox>
      ));

      userEvent.click(screen.getByText('Second'));
      fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
      await waitFor(() => expect(screen.getByText('First')).toHaveFocus());
    });

    it('focuses the last list item with end key', async () => {
      const refs = [createRef(), createRef(), createRef()];
      render((
        <Listbox {...requiredProps} refs={refs}>
          <li ref={refs[0]} tabIndex="-1">First</li>
          <li ref={refs[1]} tabIndex="-1">Second</li>
          <li ref={refs[2]} tabIndex="-1">Third</li>
        </Listbox>
      ));

      userEvent.click(screen.getByText('First'));
      fireEvent.keyDown(document.activeElement, { key: 'End' });
      await waitFor(() => expect(screen.getByText('Third')).toHaveFocus());
    });

    it('focuses the first list item with home key', async () => {
      const refs = [createRef(), createRef(), createRef()];
      render((
        <Listbox {...requiredProps} refs={refs}>
          <li ref={refs[0]} tabIndex="-1">First</li>
          <li ref={refs[1]} tabIndex="-1">Second</li>
          <li ref={refs[2]} tabIndex="-1">Third</li>
        </Listbox>
      ));

      userEvent.click(screen.getByText('Third'));
      fireEvent.keyDown(document.activeElement, { key: 'Home' });
      await waitFor(() => expect(screen.getByText('First')).toHaveFocus());
    });

    it('only has one list item in the page tab sequence', async () => {
      const refs = [createRef(), createRef(), createRef()];
      const { rerender } = render((
        <Listbox {...requiredProps} refs={refs}>
          <li aria-selected={false} ref={refs[0]} role="option" tabIndex="0">First</li>
          <li aria-selected={false} ref={refs[1]} role="option" tabIndex="-1">Second</li>
          <li aria-selected={false} ref={refs[2]} role="option" tabIndex="-1">Third</li>
        </Listbox>
      ));

      userEvent.click(screen.getByText('Second'));
      await waitFor(() => expect(screen.getByText('Second')).toHaveFocus());
      userEvent.tab();
      await waitFor(() => expect(document.body).toHaveFocus());

      rerender((
        <Listbox {...requiredProps} refs={[refs[0], refs[2]]}>
          <li aria-selected={false} ref={refs[0]} role="option" tabIndex="-1">First</li>
          <li aria-selected={false} ref={refs[2]} role="option" tabIndex="-1">Third</li>
        </Listbox>
      ));

      userEvent.tab();
      await waitFor(() => expect(screen.getByText('Third')).toHaveFocus());
    });
  });

  describe('children prop API', () => {
    it('can be set', () => {
      render((
        <Listbox {...requiredProps}>
          <li>Unique option</li>
        </Listbox>
      ));

      expect(screen.getByText('Unique option')).toBeInTheDocument();
    });
  });

  describe('className prop API', () => {
    it('can be set', () => {
      render(<Listbox {...requiredProps} className="unique-class" />);

      expect(screen.getByRole('listbox')).toHaveClass('unique-class');
    });
  });

  describe('context API', () => {
    it('has an onChange function', () => {
      const ref = createRef();
      render((
        <Listbox {...requiredProps} ref={ref}>
          <Context.Consumer>
            {({ onChange }) => (
              <li
                aria-selected
                onClick={() => onChange({ target: { selected: true, value: 'unique-value' } })}
                onKeyDown={() => {}}
                role="option"
              >
                Unique option
              </li>
            )}
          </Context.Consumer>
        </Listbox>
      ));

      userEvent.click(screen.getByRole('option', { name: 'Unique option' }));
      expect(ref.current.value).toContain('unique-value');
    });
  });

  describe('focus ref API', () => {
    it('focuses its active child', async () => {
      const ref = createRef();
      const refs = [createRef()];
      render((
        <Listbox {...requiredProps} ref={ref} refs={refs}>
          <li ref={refs[0]} tabIndex="-1">Unique option</li>
        </Listbox>
      ));

      expect(screen.getByText('Unique option')).not.toHaveFocus();
      ref.current.focus();
      await waitFor(() => expect(screen.getByText('Unique option')).toHaveFocus());
    });
  });

  describe('labelledBy prop API', () => {
    it('can be set', () => {
      render((
        <React.Fragment>
          <label id="unique-label-id">Unique label</label>
          <Listbox {...requiredProps} labelledBy="unique-label-id" />
        </React.Fragment>
      ));

      expect(screen.getByLabelText('Unique label')).toBeInTheDocument();
    });
  });

  describe('multiple prop API', () => {
    it('can be set', () => {
      render(<Listbox {...requiredProps} multiple />);
      expect(screen.getByRole('listbox')).toHaveAttribute('aria-multiselectable', 'true');
    });

    it('can be unset', () => {
      render(<Listbox {...requiredProps} multiple={false} />);
      expect(screen.getByRole('listbox')).toHaveAttribute('aria-multiselectable', 'false');
    });
  });

  describe('onValueChange prop API', () => {
    describe('single select', () => {
      it('is called on select', async () => {
        const ref = createRef();
        const refs = [createRef(), createRef(), createRef()];
        const onValueChangeSpy = jest.fn();

        render((
          <Listbox {...requiredProps} onValueChange={onValueChangeSpy} ref={ref} refs={refs}>
            <Context.Consumer>
              {({ onChange }) => (
                <React.Fragment>
                  <li onClick={() => onChange({ target: { selected: true, value: 'first' } })} ref={refs[0]} tabIndex="-1">First</li>
                  <li onClick={() => onChange({ target: { selected: true, value: 'second' } })} ref={refs[1]} tabIndex="-1">Second</li>
                  <li onClick={() => onChange({ target: { selected: true, value: 'third' } })} ref={refs[2]} tabIndex="-1">Third</li>
                </React.Fragment>
              )}
            </Context.Consumer>
          </Listbox>
        ));

        expect(ref.current.value).toBeUndefined();
        userEvent.click(screen.getByText('Second'));
        expect(onValueChangeSpy).toHaveBeenCalledWith({ target: ref.current });
        expect(ref.current.value).toBe('second');
      });

      it('is called on deselect', () => {
        const ref = createRef();
        const refs = [createRef(), createRef(), createRef()];
        const onValueChangeSpy = jest.fn();

        render((
          <Listbox {...requiredProps} onValueChange={onValueChangeSpy} ref={ref} refs={refs} value="second">
            <Context.Consumer>
              {({ onChange }) => (
                <React.Fragment>
                  <li onClick={() => onChange({ target: { selected: false, value: 'first' } })} ref={refs[0]} tabIndex="-1">First</li>
                  <li onClick={() => onChange({ target: { selected: false, value: 'second' } })} ref={refs[1]} tabIndex="-1">Second</li>
                  <li onClick={() => onChange({ target: { selected: false, value: 'third' } })} ref={refs[2]} tabIndex="-1">Third</li>
                </React.Fragment>
              )}
            </Context.Consumer>
          </Listbox>
        ));

        expect(ref.current.value).toBe('second');
        userEvent.click(screen.getByText('Second'));
        expect(onValueChangeSpy).toHaveBeenCalledWith({ target: ref.current });
        expect(ref.current.value).toBeUndefined();
      });
    });

    describe('multi select', () => {
      it('is called on select', () => {
        const ref = createRef();
        const refs = [createRef(), createRef(), createRef()];
        const onValueChangeSpy = jest.fn();

        render((
          <Listbox {...requiredProps} multiple onValueChange={onValueChangeSpy} ref={ref} refs={refs}>
            <Context.Consumer>
              {({ onChange }) => (
                <React.Fragment>
                  <li onClick={() => onChange({ target: { selected: true, value: 'first' } })} ref={refs[0]} tabIndex="-1">First</li>
                  <li onClick={() => onChange({ target: { selected: true, value: 'second' } })} ref={refs[1]} tabIndex="-1">Second</li>
                  <li onClick={() => onChange({ target: { selected: true, value: 'third' } })} ref={refs[2]} tabIndex="-1">Third</li>
                </React.Fragment>
              )}
            </Context.Consumer>
          </Listbox>
        ));

        expect(ref.current.value).toHaveLength(0);
        userEvent.click(screen.getByText('Second'));
        expect(onValueChangeSpy).toHaveBeenCalledWith({ target: ref.current });
        expect(ref.current.value).toContain('second');
        userEvent.click(screen.getByText('Third'));
        expect(onValueChangeSpy).toHaveBeenCalledWith({ target: ref.current });
        expect(ref.current.value).toContain('third');
      });

      it('is called on deselect', () => {
        const ref = createRef();
        const refs = [createRef(), createRef(), createRef()];
        const onValueChangeSpy = jest.fn();

        render((
          <Listbox {...requiredProps} multiple onValueChange={onValueChangeSpy} ref={ref} refs={refs} value={['first', 'second']}>
            <Context.Consumer>
              {({ onChange }) => (
                <React.Fragment>
                  <li onClick={() => onChange({ target: { selected: false, value: 'first' } })} ref={refs[0]} tabIndex="-1">First</li>
                  <li onClick={() => onChange({ target: { selected: false, value: 'second' } })} ref={refs[1]} tabIndex="-1">Second</li>
                  <li onClick={() => onChange({ target: { selected: false, value: 'third' } })} ref={refs[2]} tabIndex="-1">Third</li>
                </React.Fragment>
              )}
            </Context.Consumer>
          </Listbox>
        ));

        expect(ref.current.value).toContain('first');
        expect(ref.current.value).toContain('second');
        userEvent.click(screen.getByText('Second'));
        expect(onValueChangeSpy).toHaveBeenCalledWith({ target: ref.current });
        expect(ref.current.value).toContain('first');
        userEvent.click(screen.getByText('First'));
        expect(onValueChangeSpy).toHaveBeenCalledWith({ target: ref.current });
        expect(ref.current.value).toHaveLength(0);
      });
    });
  });

  describe('ref prop API', () => {
    it('can be set', () => {
      const ref = createRef();
      render(<Listbox {...requiredProps} ref={ref} />);

      expect(ref.current).toBeDefined();
    });
  });

  describe('setValue ref API', () => {
    it('sets the value state when single select', () => {
      const ref = createRef();
      render(<Listbox {...requiredProps} ref={ref} value={undefined} />);

      act(() => ref.current.setValue('unique-value'));
      expect(ref.current.value).toBe('unique-value');
    });

    it('clears the value state when single select', () => {
      const ref = createRef();
      render(<Listbox {...requiredProps} ref={ref} value="unique-value" />);

      act(() => ref.current.setValue(undefined));
      expect(ref.current.value).toBeUndefined();
    });

    it('sets the value state when multi select', () => {
      const ref = createRef();
      render(<Listbox {...requiredProps} multiple ref={ref} value={[]} />);

      act(() => ref.current.setValue(['unique-value']));
      expect(ref.current.value).toHaveLength(1);
      expect(ref.current.value[0]).toBe('unique-value');
    });

    it('clears the value state when multi select', () => {
      const ref = createRef();
      render(<Listbox {...requiredProps} multiple ref={ref} value={['unique-value']} />);

      act(() => ref.current.setValue(undefined));
      expect(ref.current.value).toHaveLength(0);
    });
  });

  describe('value ref API', () => {
    it('exposes value prop when single select', () => {
      const ref = createRef();
      render(<Listbox {...requiredProps} ref={ref} value="unique-value" />);

      expect(ref.current.value).toBe('unique-value');
    });

    it('exposes value prop when multi select', () => {
      const ref = createRef();
      const value = ['unique-value'];
      render(<Listbox {...requiredProps} multiple ref={ref} value={value} />);

      expect(ref.current.value).toBe(value);
    });
  });

  describe('value prop API', () => {
    it('defaults when single select', () => {
      const ref = createRef();
      render(<Listbox {...requiredProps} ref={ref} value={undefined} />);

      expect(ref.current.value).toBeUndefined();
    });

    it('defaults when multi select', () => {
      const ref = createRef();
      render(<Listbox {...requiredProps} multiple ref={ref} value={undefined} />);

      expect(ref.current.value).toHaveLength(0);
    });
  });

  describe('refs prop API', () => {
    // No direct tests at the moment
    // Tested accessibility tests
  });
});
