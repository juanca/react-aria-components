import React, {
  createRef,
} from 'react';
import {
  act,
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Combobox from './combobox.js';
import { ChangeHandler } from '../listbox/listbox.js';
import ListOption from '../list-option/list-option.js';

describe('<Combobox />', () => {
  const requiredProps = {
    id: 'test-id',
    label: 'Test label',
    refs: [],
  };

  it('has defaults', () => {
    const ref = createRef();
    render(<Combobox {...requiredProps} ref={ref} />);
    expect(document.body).toMatchSnapshot();
    expect(ref.current).toMatchSnapshot();
    expect(document.body).toHaveFocus();
  });

  describe('children API', () => {
    it('can be set', () => {
      render((
        <Combobox {...requiredProps}>
          <option>Unique option</option>
        </Combobox>
      ));
      userEvent.click(screen.getByText('Test label'));
      expect(screen.getByText('Unique option')).toBeDefined();
    });
  });

  describe('focus API', () => {
    it('focuses the input', () => {
      const ref = createRef();
      render(<Combobox {...requiredProps} ref={ref} />);
      const input = screen.getByLabelText('Test label', { selector: 'input' });
      expect(input).not.toHaveFocus();
      act(() => ref.current.focus());
      expect(input).toHaveFocus();
    });
  });

  describe('id API', () => {
    it('can be set', () => {
      render(<Combobox {...requiredProps} id="unique-id" />);
      expect(screen.getByText('Test label')).toHaveAttribute('id', 'unique-id-label');
    });
  });

  describe('label API', () => {
    it('can be set', () => {
      render(<Combobox {...requiredProps} label="Unique label" />);
      expect(screen.getByText('Unique label', { selector: 'label' })).toBeInTheDocument();
    });
  });

  describe('onChange API', () => {
    it('is a function', () => {
      const onChange = jest.fn();
      render((
        <Combobox {...requiredProps} onChange={onChange}>
          <ChangeHandler.Consumer>
            {(internalOnChange) => (
              <option
                onClick={(event) => {
                  event.target.selected = true; // eslint-disable-line
                  internalOnChange(event);
                }}
                value="unique-option"
              >
                Option
              </option>
            )}
          </ChangeHandler.Consumer>
        </Combobox>
      ));
      expect(onChange).not.toHaveBeenCalled();

      userEvent.click(screen.getByRole('combobox', { name: 'Test label' }));
      userEvent.click(screen.getByText('Option'));
      expect(onChange).toHaveBeenCalledWith(expect.objectContaining({
        target: expect.objectContaining({ value: 'unique-option' }),
      }));
    });
  });

  describe('onInput API', () => {
    it('is called on user typing', () => {
      const spy = jest.fn((event) => event.persist());
      render(<Combobox {...requiredProps} onInput={spy} />);
      expect(spy).not.toHaveBeenCalled();

      userEvent.type(screen.getByRole('textbox', { name: 'Test label' }), 'unique text');
      expect(spy).toHaveBeenCalledWith(expect.objectContaining({
        target: expect.objectContaining({ value: 'unique text' }),
      }));
    });
  });

  describe('value API', () => {
    it('can be set', () => {
      const { rerender } = render(<Combobox {...requiredProps} value="unique-value" />);
      expect(screen.getByLabelText('Test label', { selector: 'input' })).toHaveValue('unique-value');
      rerender(<Combobox {...requiredProps} value="another-value" />);
      expect(screen.getByLabelText('Test label', { selector: 'input' })).toHaveValue('another-value');
    });
  });

  describe('blurring', () => {
    test('with a mouse', () => {
      const ref = createRef();
      const refs = [createRef()];
      render((
        <Combobox {...requiredProps} ref={ref} refs={refs}>
          <ListOption ref={refs[0]} value="test-value">Test option</ListOption>
        </Combobox>
      ));

      userEvent.click(screen.getByRole('combobox', { name: 'Test label' }));
      const option = screen.getByText('Test option');
      expect(option).toBeInTheDocument();
      userEvent.click(document.body);
      expect(document.body).toHaveFocus();
      expect(option).not.toBeInTheDocument();
    });

    test('with a keyboard on the textbox', () => {
      const ref = createRef();
      const refs = [createRef()];
      render((
        <Combobox {...requiredProps} ref={ref} refs={refs}>
          <ListOption ref={refs[0]} value="test-value">Test option</ListOption>
        </Combobox>
      ));

      userEvent.tab();
      const option = screen.getByText('Test option');
      expect(option).toBeInTheDocument();
      userEvent.keyboard('{Escape}');
      expect(screen.getByRole('textbox', { name: 'Test label' })).toHaveFocus();
      expect(option).not.toBeInTheDocument();
    });

    test('with a keyboard on the popup', () => {
      const ref = createRef();
      const refs = [createRef()];
      render((
        <Combobox {...requiredProps} ref={ref} refs={refs}>
          <ListOption ref={refs[0]} value="test-value">Test option</ListOption>
        </Combobox>
      ));

      userEvent.tab();
      const option = screen.getByText('Test option');
      expect(option).toBeInTheDocument();
      userEvent.tab();
      userEvent.keyboard('{Escape}');
      expect(screen.getByRole('textbox', { name: 'Test label' })).toHaveFocus();
      expect(option).not.toBeInTheDocument();
    });
  });

  describe('selecting an option', () => {
    test('with a mouse', () => {
      const ref = createRef();
      const refs = [createRef()];
      render((
        <Combobox {...requiredProps} ref={ref} refs={refs}>
          <ListOption ref={refs[0]} value="test-value">Test option</ListOption>
        </Combobox>
      ));

      userEvent.click(screen.getByRole('combobox', { name: 'Test label' }));
      let option = screen.getByText('Test option');
      userEvent.click(option);
      expect(screen.getByRole('textbox', { name: 'Test label' })).toHaveFocus();
      expect(screen.getByRole('textbox', { name: 'Test label' })).toHaveValue('test-value');
      expect(ref.current.value).toBe('test-value');
      expect(option).not.toBeInTheDocument();

      userEvent.click(document.body);
      userEvent.click(screen.getByRole('combobox', { name: 'Test label' }));
      option = screen.getByText('Test option');
      userEvent.click(option);
      expect(screen.getByRole('textbox', { name: 'Test label' })).toHaveFocus();
      expect(screen.getByRole('textbox', { name: 'Test label' })).toHaveValue('test-value');
      expect(ref.current.value).toBe('test-value');
      expect(option).not.toBeInTheDocument();
    });

    test('with a keyboard', () => {
      const ref = createRef();
      const refs = [createRef()];
      render((
        <Combobox {...requiredProps} ref={ref} refs={refs}>
          <ListOption ref={refs[0]} value="test-value">Test option</ListOption>
        </Combobox>
      ));

      userEvent.tab();
      expect(screen.getByRole('textbox', { name: 'Test label' })).toHaveFocus();
      userEvent.tab();
      expect(screen.getByRole('listbox')).toHaveFocus();
      userEvent.keyboard('{ArrowDown}');
      let option = screen.getByText('Test option');
      expect(option).toHaveFocus();
      userEvent.keyboard(' ');
      expect(screen.getByRole('textbox', { name: 'Test label' })).toHaveFocus();
      expect(screen.getByRole('textbox', { name: 'Test label' })).toHaveValue('test-value');
      expect(ref.current.value).toBe('test-value');
      expect(option).not.toBeInTheDocument();

      userEvent.tab();
      expect(document.body).toHaveFocus();
      userEvent.tab();
      expect(screen.getByRole('textbox', { name: 'Test label' })).toHaveFocus();
      userEvent.tab();
      expect(screen.getByRole('listbox')).toHaveFocus();
      userEvent.keyboard('{ArrowDown}');
      option = screen.getByText('Test option');
      expect(option).toHaveFocus();
      userEvent.keyboard(' ');
      expect(screen.getByRole('textbox', { name: 'Test label' })).toHaveFocus();
      expect(screen.getByRole('textbox', { name: 'Test label' })).toHaveValue('test-value');
      expect(ref.current.value).toBe('test-value');
      expect(option).not.toBeInTheDocument();
    });
  });

  describe('keyboard navigation', () => {
    it('handles down arrow', () => {
      const ref = createRef();
      const refs = [createRef(), createRef()];
      render((
        <Combobox {...requiredProps} ref={ref} refs={refs}>
          <ListOption ref={refs[0]} value="test-value-1">Test option 1</ListOption>
          <ListOption ref={refs[1]} value="test-value-2">Test option 2</ListOption>
        </Combobox>
      ));

      userEvent.click(screen.getByRole('combobox'));
      userEvent.keyboard('{ArrowDown}');
      expect(screen.getByText('Test option 1')).toHaveFocus();
    });

    it('handles up arrow', () => {
      const ref = createRef();
      const refs = [createRef(), createRef()];
      render((
        <Combobox {...requiredProps} ref={ref} refs={refs}>
          <ListOption ref={refs[0]} value="test-value-1">Test option 1</ListOption>
          <ListOption ref={refs[1]} value="test-value-2">Test option 2</ListOption>
        </Combobox>
      ));

      userEvent.click(screen.getByRole('combobox'));
      userEvent.keyboard('{ArrowUp}');
      expect(screen.getByText('Test option 1')).toHaveFocus();
    });
  });
});
