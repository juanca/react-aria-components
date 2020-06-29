import React, {
  createRef,
} from 'react';
import renderer from 'react-test-renderer';
import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Listbox from './listbox.js';

describe('<Listbox />', () => {
  const requiredProps = {
    labelledBy: 'test-label-id',
  };

  it('has defaults', () => {
    expect(renderer.create(<Listbox {...requiredProps} />).toJSON()).toMatchSnapshot();
  });

  describe('accessibility', () => {
    it('does not steal focus on mount', () => {
      const refs = [createRef(), createRef(), createRef()];
      render((
        <Listbox {...requiredProps} refs={refs}>
          <li ref={refs[0]}>First</li>
          <li ref={refs[1]}>Second</li>
          <li ref={refs[2]}>Third</li>
        </Listbox>
      ));

      expect(document.body).toHaveFocus();
    });

    it('focuses the list item with a click', async () => {
      const refs = [createRef(), createRef(), createRef()];
      render((
        <Listbox {...requiredProps} refs={refs}>
          <li ref={refs[0]}>First</li>
          <li ref={refs[1]}>Second</li>
          <li ref={refs[2]}>Third</li>
        </Listbox>
      ));

      userEvent.click(screen.getByText('Second'));
      await waitFor(() => expect(screen.getByText('Second')).toHaveFocus());
    });

    it('focuses the next list item with arrow down key', async () => {
      const refs = [createRef(), createRef(), createRef()];
      render((
        <Listbox {...requiredProps} refs={refs}>
          <li ref={refs[0]}>First</li>
          <li ref={refs[1]}>Second</li>
          <li ref={refs[2]}>Third</li>
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
          <li ref={refs[0]}>First</li>
          <li ref={refs[1]}>Second</li>
          <li ref={refs[2]}>Third</li>
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
          <li ref={refs[0]}>First</li>
          <li ref={refs[1]}>Second</li>
          <li ref={refs[2]}>Third</li>
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
          <li ref={refs[0]}>First</li>
          <li ref={refs[1]}>Second</li>
          <li ref={refs[2]}>Third</li>
        </Listbox>
      ));

      userEvent.click(screen.getByText('Third'));
      fireEvent.keyDown(document.activeElement, { key: 'Home' });
      await waitFor(() => expect(screen.getByText('First')).toHaveFocus());
    });

    it('only has one list item in the page tab sequence', async () => {
      const refs = [createRef(), createRef(), createRef()];
      render((
        <Listbox {...requiredProps} refs={refs}>
          <li ref={refs[0]}>First</li>
          <li ref={refs[1]}>Second</li>
          <li ref={refs[2]}>Third</li>
        </Listbox>
      ));

      userEvent.tab();
      await waitFor(() => expect(screen.getByText('First')).toHaveFocus());
      userEvent.tab();
      await waitFor(() => expect(document.body).toHaveFocus());
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

  describe('focus ref API', () => {
    it('focuses its active child', async () => {
      const ref = createRef();
      const refs = [createRef()];
      render((
        <Listbox {...requiredProps} ref={ref} refs={refs}>
          <li ref={refs[0]}>Unique option</li>
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

  describe('ref prop API', () => {
    it('can be set', () => {
      const ref = createRef();
      render(<Listbox {...requiredProps} ref={ref} />);

      expect(ref.current).toBeDefined();
    });
  });

  describe('refs prop API', () => {
    // No direct tests at the moment
    // Tested elsewhere
  });
});
