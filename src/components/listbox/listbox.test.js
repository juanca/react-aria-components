import React, {
  createRef,
} from 'react';
import {
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Listbox from './listbox.js';
import ListOption from '../list-option/list-option.js';

describe('<Listbox />', () => {
  const requiredProps = {
    labelledBy: 'test-label-id',
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<Listbox {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(document.body).toHaveFocus();
    expect(ref.current).toMatchSnapshot();
  });

  describe('active API', () => {
    it('is true', () => {
      render(<Listbox {...requiredProps} active={true} />);
      expect(screen.getByRole('listbox')).toHaveAttribute('tabindex', '0');
    });

    it('is false', () => {
      render(<Listbox {...requiredProps} active={false} />);
      expect(screen.getByRole('listbox')).toHaveAttribute('tabindex', '-1');
    });
  });

  describe('children API', () => {
    it('can be set', () => {
      render((
        <Listbox {...requiredProps}>
          <li>Unique option</li>
        </Listbox>
      ));

      expect(screen.getByText('Unique option')).toBeInTheDocument();
    });
  });

  describe('className API', () => {
    it('can be set', () => {
      render(<Listbox {...requiredProps} className="unique-class" />);

      expect(screen.getByRole('listbox')).toHaveClass('unique-class');
    });
  });

  describe('focus API', () => {
    it('focuses itsself', async () => {
      const ref = createRef();
      const refs = [createRef()];
      render((
        <Listbox {...requiredProps} ref={ref} refs={refs}>
          <li ref={refs[0]} tabIndex="-1">Unique option</li>
        </Listbox>
      ));

      expect(screen.getByRole('listbox')).not.toHaveFocus();
      ref.current.focus();
      await waitFor(() => expect(screen.getByRole('listbox')).toHaveFocus());
      expect(document.body).toMatchSnapshot();
    });

    it('focuses its active child', async () => {
      const ref = createRef();
      const refs = [createRef()];
      render((
        <Listbox {...requiredProps} ref={ref} refs={refs}>
          <li ref={refs[0]} tabIndex="-1">Unique option</li>
        </Listbox>
      ));

      userEvent.click(screen.getByText('Unique option'));
      userEvent.click(document.body);
      expect(screen.getByText('Unique option')).not.toHaveFocus();
      ref.current.focus();
      await waitFor(() => expect(screen.getByText('Unique option')).toHaveFocus());
      expect(document.body).toMatchSnapshot();
    });
  });

  describe('labelledBy API', () => {
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

  describe('multiple API', () => {
    it('can be set', () => {
      render(<Listbox {...requiredProps} multiple />);
      expect(screen.getByRole('listbox')).toHaveAttribute('aria-multiselectable', 'true');
    });

    it('can be unset', () => {
      render(<Listbox {...requiredProps} multiple={false} />);
      expect(screen.getByRole('listbox')).toHaveAttribute('aria-multiselectable', 'false');
    });
  });

  describe('onChange API', () => {
    describe('single select', () => {
      it('is called on select', async () => {
        const ref = createRef();
        const refs = [createRef(), createRef(), createRef()];
        const spy = jest.fn();

        render((
          <Listbox {...requiredProps} multiple={false} onChange={spy} ref={ref} refs={refs}>
            <ListOption ref={refs[0]} value="first">First</ListOption>
            <ListOption ref={refs[1]} value="second">Second</ListOption>
            <ListOption ref={refs[2]} value="third">Third</ListOption>
          </Listbox>
        ));

        expect(ref.current.value).toBeUndefined();
        userEvent.click(screen.getByText('Second'));
        expect(spy).toHaveBeenCalledWith({ target: ref.current });
        expect(ref.current.value).toBe('second');
      });

      it('is not called on deselect', () => {
        const ref = createRef();
        const refs = [createRef(), createRef(), createRef()];
        const spy = jest.fn();

        render((
          <Listbox {...requiredProps} multiple={false} onChange={spy} ref={ref} refs={refs} value="second">
            <ListOption ref={refs[0]} value="first">First</ListOption>
            <ListOption ref={refs[1]} selected value="second">Second</ListOption>
            <ListOption ref={refs[2]} value="third">Third</ListOption>
          </Listbox>
        ));

        expect(ref.current.value).toBe('second');
        userEvent.click(screen.getByText('Second'));
        expect(spy).not.toHaveBeenCalled();
        expect(ref.current.value).toBe('second');
      });
    });

    describe('multi select', () => {
      it('is called on select', () => {
        const ref = createRef();
        const refs = [createRef(), createRef(), createRef()];
        const spy = jest.fn();

        render((
          <Listbox {...requiredProps} multiple onChange={spy} ref={ref} refs={refs}>
            <ListOption ref={refs[0]} value="first">First</ListOption>
            <ListOption ref={refs[1]} value="second">Second</ListOption>
            <ListOption ref={refs[2]} value="third">Third</ListOption>
          </Listbox>
        ));

        expect(ref.current.value).toHaveLength(0);
        userEvent.click(screen.getByText('Second'));
        expect(spy).toHaveBeenCalledWith({ target: ref.current });
        expect(ref.current.value).toContain('second');
        userEvent.click(screen.getByText('Third'));
        expect(spy).toHaveBeenCalledWith({ target: ref.current });
        expect(ref.current.value).toContain('third');
      });

      it('is called on deselect', () => {
        const ref = createRef();
        const refs = [createRef(), createRef(), createRef()];
        const spy = jest.fn();

        render((
          <Listbox {...requiredProps} multiple onChange={spy} ref={ref} refs={refs} value={['first', 'second']}>
            <ListOption ref={refs[0]} selected value="first">First</ListOption>
            <ListOption ref={refs[1]} selected value="second">Second</ListOption>
            <ListOption ref={refs[2]} value="third">Third</ListOption>
          </Listbox>
        ));

        expect(ref.current.value).toContain('first');
        expect(ref.current.value).toContain('second');
        userEvent.click(screen.getByText('Second'));
        expect(spy).toHaveBeenCalledWith({ target: ref.current });
        expect(ref.current.value).toContain('first');
        userEvent.click(screen.getByText('First'));
        expect(spy).toHaveBeenCalledWith({ target: ref.current });
        expect(ref.current.value).toHaveLength(0);
      });
    });
  });

  describe('onSelect API', () => {
    describe('single select', () => {
      it('is called on select', async () => {
        const ref = createRef();
        const refs = [createRef(), createRef(), createRef()];
        const spy = jest.fn();

        render((
          <Listbox {...requiredProps} multiple={false} onSelect={spy} ref={ref} refs={refs}>
            <ListOption ref={refs[0]} value="first">First</ListOption>
            <ListOption ref={refs[1]} value="second">Second</ListOption>
            <ListOption ref={refs[2]} value="third">Third</ListOption>
          </Listbox>
        ));

        userEvent.click(screen.getByText('Second'));
        expect(spy).toHaveBeenCalledWith(expect.objectContaining({
          defaultPrevented: false,
          preventDefault: expect.any(Function),
          target: expect.objectContaining({ selected: false, value: 'second' }),
        }));
      });

      it('is called on deselect', () => {
        const ref = createRef();
        const refs = [createRef(), createRef(), createRef()];
        const spy = jest.fn();

        render((
          <Listbox {...requiredProps} multiple={false} onSelect={spy} ref={ref} refs={refs} value="second">
            <ListOption ref={refs[0]} value="first">First</ListOption>
            <ListOption ref={refs[1]} selected value="second">Second</ListOption>
            <ListOption ref={refs[2]} value="third">Third</ListOption>
          </Listbox>
        ));

        userEvent.click(screen.getByText('Second'));
        expect(spy).toHaveBeenCalledWith(expect.objectContaining({
          defaultPrevented: false,
          preventDefault: expect.any(Function),
          target: expect.objectContaining({
            selected: true,
            value: 'second',
          }),
        }));
      });
    });

    describe('multi select', () => {
      it('is called on select', () => {
        const ref = createRef();
        const refs = [createRef(), createRef(), createRef()];
        const spy = jest.fn();

        render((
          <Listbox {...requiredProps} multiple onSelect={spy} ref={ref} refs={refs}>
            <ListOption ref={refs[0]} value="first">First</ListOption>
            <ListOption ref={refs[1]} value="second">Second</ListOption>
            <ListOption ref={refs[2]} value="third">Third</ListOption>
          </Listbox>
        ));

        userEvent.click(screen.getByText('Second'));
        expect(spy).toHaveBeenCalledWith(expect.objectContaining({
          defaultPrevented: false,
          preventDefault: expect.any(Function),
          target: expect.objectContaining({
            selected: false,
            value: 'second',
          }),
        }));
        spy.mockClear();
        userEvent.click(screen.getByText('Third'));
        expect(spy).toHaveBeenCalledWith(expect.objectContaining({
          defaultPrevented: false,
          preventDefault: expect.any(Function),
          target: expect.objectContaining({
            selected: false,
            value: 'third',
          }),
        }));
      });

      it('is called on deselect', () => {
        const ref = createRef();
        const refs = [createRef(), createRef(), createRef()];
        const spy = jest.fn();

        render((
          <Listbox {...requiredProps} multiple onSelect={spy} ref={ref} refs={refs} value={['first', 'second']}>
            <ListOption ref={refs[0]} selected value="first">First</ListOption>
            <ListOption ref={refs[1]} selected value="second">Second</ListOption>
            <ListOption ref={refs[2]} value="third">Third</ListOption>
          </Listbox>
        ));

        userEvent.click(screen.getByText('Second'));
        expect(spy).toHaveBeenCalledWith(expect.objectContaining({
          defaultPrevented: false,
          preventDefault: expect.any(Function),
          target: expect.objectContaining({
            selected: true,
            value: 'second',
          }),
        }));
        spy.mockClear();
        userEvent.click(screen.getByText('First'));
        expect(spy).toHaveBeenCalledWith(expect.objectContaining({
          defaultPrevented: false,
          preventDefault: expect.any(Function),
          target: expect.objectContaining({
            selected: true,
            value: 'first',
          }),
        }));
      });
    });
  });

  describe('ref API', () => {
    it('can be set', () => {
      const ref = createRef();
      render(<Listbox {...requiredProps} ref={ref} />);

      expect(ref.current).toBeDefined();
    });
  });

  describe('value API', () => {
    it('defaults when single select', () => {
      const ref = createRef();
      render(<Listbox {...requiredProps} ref={ref} value={undefined} />);

      expect(ref.current.value).toBeUndefined();
    });

    it('exposes value prop when single select', () => {
      const ref = createRef();
      render(<Listbox {...requiredProps} ref={ref} value="unique-value" />);

      expect(ref.current.value).toBe('unique-value');
    });

    it('defaults when multi select', () => {
      const ref = createRef();
      render(<Listbox {...requiredProps} multiple ref={ref} value={undefined} />);

      expect(ref.current.value).toHaveLength(0);
    });

    it('exposes value prop when multi select', () => {
      const ref = createRef();
      const value = ['unique-value'];
      render(<Listbox {...requiredProps} multiple ref={ref} value={value} />);

      expect(ref.current.value).toBe(value);
    });
  });

  describe('refs API', () => {
    // No direct tests at the moment
    // Tested accessibility tests
  });

  describe('focus behavior', () => {
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
      expect(document.body).toMatchSnapshot();
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
      expect(document.body).toMatchSnapshot();
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
      userEvent.keyboard('{ArrowDown}');
      await waitFor(() => expect(screen.getByText('Third')).toHaveFocus());
      expect(document.body).toMatchSnapshot();
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
      userEvent.keyboard('{ArrowUp}');
      await waitFor(() => expect(screen.getByText('First')).toHaveFocus());
      expect(document.body).toMatchSnapshot();
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
      userEvent.keyboard('{End}');
      await waitFor(() => expect(screen.getByText('Third')).toHaveFocus());
      expect(document.body).toMatchSnapshot();
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
      userEvent.keyboard('{Home}');
      await waitFor(() => expect(screen.getByText('First')).toHaveFocus());
      expect(document.body).toMatchSnapshot();
    });
  });
});
